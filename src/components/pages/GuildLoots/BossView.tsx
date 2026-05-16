import { useState } from 'react'
import { useGuild } from '../../../context/GuildContext'
import { useApp } from '../../../context/AppContext'
import { SLOT_LABELS } from '../../../data/items'
import { CLASS_COLORS } from '../../../data/classes'
import type { Boss, LootAttribution } from '../../../types'
import styles from './BossView.module.css'

interface Props {
  bosses: Boss[]
}

export default function BossView({ bosses }: Props) {
  const { lootAttributions, saveLootAttribution, clearLootAttribution, currentGroup, currentGroupId, bossStatuses, toggleBossKill, currentUserRank } = useGuild()
  const { lang, showToast, authUser } = useApp()
  const [openBosses, setOpenBosses] = useState<number[]>([])
  const SL = SLOT_LABELS[lang]
  const grp = currentGroup()
  const members = grp?.members ?? []
  const myRank = currentUserRank(authUser)
  const canToggleKill = myRank === 'owner' || (myRank === 'coadmin' && (grp?.coAdminPerms.canManageBossStatus ?? false))

  function toggleBoss(n: number) {
    setOpenBosses(prev => prev.includes(n) ? prev.filter(x => x !== n) : [...prev, n])
  }

  function attributeLoot(gk: string, memberName: string, memberColor: string, memberCls: string, lootName: string) {
    if (!currentGroupId) return
    saveLootAttribution(currentGroupId, gk, { name: memberName, color: memberColor, cls: memberCls })
    showToast(`${lootName} → ${memberName}!`, 'success')
  }

  function clearAttribution(gk: string) {
    if (!currentGroupId) return
    clearLootAttribution(currentGroupId, gk)
  }

  return (
    <div className={styles.list}>
      {bosses.map((boss, bi) => {
        const isOpen = openBosses.includes(boss.n)
        const effectiveSt = bossStatuses[`${currentGroupId}_${boss.n}`] ?? boss.st
        const stc = effectiveSt === 'k' ? styles.stK : effectiveSt === 'w' ? styles.stW : styles.stS
        const stl = effectiveSt === 'k' ? '✓ Tué' : effectiveSt === 'w' ? '✗ Vivant' : '— Ignoré'

        return (
          <div key={boss.n} className={`${styles.bcard} ${isOpen ? styles.open : ''}`}>
            <div className={styles.bheader} onClick={() => toggleBoss(boss.n)}>
              <div className={styles.bnum}>{bi + 1}</div>
              <div className={styles.bname}>{boss.name}</div>
              <span
                className={`${styles.bst} ${stc} ${canToggleKill ? styles.bstClickable : ''}`}
                title={canToggleKill ? (effectiveSt === 'k' ? 'Marquer comme vivant' : 'Marquer comme tué') : undefined}
                onClick={canToggleKill ? e => { e.stopPropagation(); toggleBossKill(currentGroupId, boss.n) } : undefined}
              >{stl}</span>
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
                  const isAttributed = !!attribution

                  return (
                    <div key={li} className={styles.lootEntry}>
                      <div className={`${styles.lrow} ${isAttributed ? styles.attributed : ''}`}>
                        <div className={`${styles.lchk} ${isAttributed ? styles.lchkDone : ''}`} onClick={() => isAttributed && clearAttribution(gk)}>
                          {isAttributed ? '✓' : ''}
                        </div>
                        <div className={styles.lname} style={{ color: qc }}>{l.name}</div>
                        <span className={styles.lslot}>{SL[l.slot]}</span>
                        <span className={styles.lilvl}>ilvl {l.ilvl}</span>
                        {isAttributed
                          ? <span className={styles.lwho}>→ <strong style={{ color: attribution.color }}>{attribution.name}</strong></span>
                          : <span className={styles.lwho} style={{ opacity: .6 }}>Non attribué</span>
                        }
                      </div>

                      {members.length > 0 && (
                        <div className={styles.needsPanel}>
                          <div className={styles.needsLabel}>
                            <span style={{ fontSize: 11, color: 'var(--text3)' }}>Attribuer à :</span>
                          </div>
                          <div className={styles.needsList}>
                            {members.map(m => {
                              const color = CLASS_COLORS[m.cls] ?? '#aaaaaa'
                              const isSelected = attribution?.name === m.name
                              return (
                                <div
                                  key={m.name}
                                  className={`${styles.neederBtn} ${isSelected ? styles.selected : ''}`}
                                  style={{ '--mc': color } as React.CSSProperties}
                                  onClick={() => attributeLoot(gk, m.name, color, m.cls, l.name)}
                                >
                                  <div className={styles.neederAvatar} style={{ background: color + '22', color, borderColor: color + '44', position: 'relative', overflow: 'hidden' }}>
                                    {m.name[0]}
                                    {m.avatarUrl && (
                                      <img
                                        src={m.avatarUrl}
                                        alt=""
                                        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
                                        onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
                                      />
                                    )}
                                  </div>
                                  <div className={styles.neederInfo}>
                                    <div className={styles.neederName} style={{ color }}>{m.name}</div>
                                    <div className={styles.neederCls}>{m.cls}</div>
                                  </div>
                                  {isSelected && <span className={styles.prioBadge}>✓</span>}
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
