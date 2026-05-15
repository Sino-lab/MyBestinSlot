import { useState } from 'react'
import { useGuild } from '../../../context/GuildContext'
import { useApp } from '../../../context/AppContext'
import { GUILD_MEMBERS } from '../../../data/guild'
import { SLOT_LABELS } from '../../../data/items'
import type { Boss, LootAttribution } from '../../../types'
import styles from './BossView.module.css'

interface Props {
  bosses: Boss[]
}

export default function BossView({ bosses }: Props) {
  const { lootAttributions, setLootAttributions } = useGuild()
  const { lang, showToast } = useApp()
  const [openBosses, setOpenBosses] = useState<number[]>([])
  const SL = SLOT_LABELS[lang]

  function toggleBoss(n: number) {
    setOpenBosses(prev => prev.includes(n) ? prev.filter(x => x !== n) : [...prev, n])
  }

  function attributeLoot(gk: string, member: typeof GUILD_MEMBERS[0], bossN: number, lootIdx: number) {
    const boss = bosses.find(b => b.n === bossN)
    const bossLoot = boss?.loots[lootIdx]
    setLootAttributions(prev => ({
      ...prev,
      [gk]: { name: member.name, color: member.color, cls: member.cls + ' ' + member.spec }
    }))
    if (bossLoot) showToast(`${bossLoot.name} → ${member.name}!`, 'success')
  }

  function clearAttribution(gk: string) {
    setLootAttributions(prev => { const n = { ...prev }; delete n[gk]; return n })
  }

  return (
    <div className={styles.list}>
      {bosses.map((boss, bi) => {
        const isOpen = openBosses.includes(boss.n)
        const stc = boss.st === 'k' ? styles.stK : boss.st === 'w' ? styles.stW : styles.stS
        const stl = boss.st === 'k' ? '✓ Tué' : boss.st === 'w' ? '✗ Wipé' : '— Ignoré'
        const conflictCount = boss.loots.filter((_, li) => {
          const needs = GUILD_MEMBERS.filter(m => m.list.some(i => i.name === boss.loots[li].name))
          return needs.length > 1
        }).length

        return (
          <div key={boss.n} className={`${styles.bcard} ${isOpen ? styles.open : ''}`}>
            <div className={styles.bheader} onClick={() => toggleBoss(boss.n)}>
              <div className={styles.bnum}>{bi + 1}</div>
              <div className={styles.bname}>{boss.name}</div>
              <span className={`${styles.bst} ${stc}`}>{stl}</span>
              {conflictCount > 0 && (
                <span className={styles.conflict}>⚔️ {conflictCount} conflit{conflictCount > 1 ? 's' : ''}</span>
              )}
              <span className={styles.bneed}>{boss.loots.length ? `${boss.loots.length} loot${boss.loots.length > 1 ? 's' : ''}` : '—'}</span>
              <span className={styles.chev}>▼</span>
            </div>

            {isOpen && (
              <div className={styles.bloots}>
                {!boss.loots.length ? (
                  <p style={{ padding: '10px 0', color: 'var(--text3)', fontSize: 12 }}>Aucun loot enregistré.</p>
                ) : boss.loots.map((l, li) => {
                  const gk = `${boss.n}_${li}`
                  const attribution = lootAttributions[gk] as LootAttribution | undefined
                  const qc = l.q === 'legendary' ? 'var(--legendary)' : l.q === 'epic' ? 'var(--epic)' : 'var(--rare)'

                  const needs = GUILD_MEMBERS
                    .filter(m => m.list.some(i => i.name === l.name))
                    .map(m => ({ ...m, hasIt: m.list.find(i => i.name === l.name)?.obtained ?? false }))
                    .sort((a, b) => Number(a.hasIt) - Number(b.hasIt))
                  const isConflict = needs.length > 1
                  const isAttributed = !!attribution

                  return (
                    <div key={li} className={`${styles.lootEntry} ${isConflict ? styles.conflict2 : ''}`}>
                      <div className={`${styles.lrow} ${isAttributed ? styles.attributed : ''}`}>
                        <div className={`${styles.lchk} ${isAttributed ? styles.lchkDone : ''}`} onClick={() => isAttributed && clearAttribution(gk)}>
                          {isAttributed ? '✓' : ''}
                        </div>
                        <div className={styles.lname} style={{ color: qc }}>{l.name}</div>
                        <span className={styles.lslot}>{SL[l.slot]}</span>
                        <span className={styles.lilvl}>ilvl {l.ilvl}</span>
                        {isAttributed
                          ? <span className={styles.lwho}>→ <strong style={{ color: attribution.color }}>{attribution.name}</strong></span>
                          : <span className={styles.lwho} style={{ opacity: .6 }}>{needs.length ? 'Non attribué' : '—'}</span>
                        }
                      </div>

                      {needs.length > 0 && (
                        <div className={`${styles.needsPanel} ${isConflict ? styles.multi : ''}`}>
                          {isConflict
                            ? <div className={styles.needsLabel}><span className={styles.conflictBadge}>⚔️ {needs.length} joueurs ont besoin</span><span style={{ fontSize: 10, color: 'var(--text3)' }}>Clique pour attribuer</span></div>
                            : <div className={styles.needsLabel}><span style={{ fontSize: 11, color: 'var(--text3)' }}>1 joueur a besoin</span></div>
                          }
                          <div className={styles.needsList}>
                            {needs.map((m, ni) => {
                              const isSelected = attribution?.name === m.name
                              const prog = m.list.filter(i => i.obtained).length
                              const pct = m.list.length > 0 ? Math.round(prog / m.list.length * 100) : 0
                              return (
                                <div
                                  key={m.name}
                                  className={`${styles.neederBtn} ${isSelected ? styles.selected : ''} ${m.hasIt ? styles.hasIt : ''}`}
                                  style={{ '--mc': m.color } as React.CSSProperties}
                                  onClick={() => !m.hasIt && attributeLoot(gk, m, boss.n, li)}
                                >
                                  <div className={styles.neederAvatar} style={{ background: m.color + '22', color: m.color, borderColor: m.color + '44' }}>{m.name[0]}</div>
                                  <div className={styles.neederInfo}>
                                    <div className={styles.neederName} style={{ color: m.color }}>{m.name}</div>
                                    <div className={styles.neederCls}>{m.cls} {m.spec}</div>
                                  </div>
                                  <div className={styles.neederRight}>
                                    {ni === 0 && !m.hasIt && <span className={styles.prioBadge}>Priorité</span>}
                                    {m.hasIt && <span className={styles.hasBadge}>Déjà obtenu</span>}
                                    <div className={styles.neederProg}>
                                      <div className={styles.neederTrack}><div className={styles.neederFill} style={{ width: pct + '%', background: m.color }} /></div>
                                      <span className={styles.neederPct}>{pct}%</span>
                                    </div>
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                          {isAttributed && (
                            <button className={styles.clearAttrib} onClick={() => clearAttribution(gk)}>Retirer l'attribution</button>
                          )}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
