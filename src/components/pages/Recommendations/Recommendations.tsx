import { useState } from 'react'
import { useApp } from '../../../context/AppContext'
import { CLASSES, CLASS_COLORS } from '../../../data/classes'
import { makeReco } from '../../../data/reco'
import { t } from '../../../data/i18n'
import CharacterPanel from './CharacterPanel'
import type { WowClass, Spec, Mode, RecoItem } from '../../../types'
import styles from './Recommendations.module.css'

export default function Recommendations() {
  const { lang, addToList, removeFromList, isInListByName, showToast, myList, selectedCharacter } = useApp()
  const [selectedClass, setSelectedClass] = useState<WowClass | null>(null)
  const [selectedSpec, setSelectedSpec] = useState<Spec | null>(null)
  const [recoMode, setRecoMode] = useState<Mode>('mythicplus')

  function pickClass(cls: WowClass) {
    setSelectedClass(cls)
    setSelectedSpec(null)
  }

  function pickSpec(spec: Spec) {
    setSelectedSpec(spec)
  }

  function toggleReco(item: RecoItem) {
    const inList = isInListByName(item.name, item.slot)
    if (inList) {
      const found = myList.find(i => i.name === item.name && i.slot === item.slot)
      if (found) { removeFromList(found.id); showToast('Removed from your list', 'remove') }
    } else {
      addToList({ id: Date.now(), slot: item.slot, name: item.name, q: item.q, ilvl: item.ilvl, source: item.source, mode: recoMode })
      showToast(`Added: ${item.name}`, 'success')
    }
  }

  const reco = selectedSpec ? makeReco(recoMode) : []
  const MODES: { id: Mode; label: string }[] = [
    { id: 'mythicplus', label: '⚡ M+' },
    { id: 'raid', label: '🏰 Raid' },
  ]

  return (
    <div className={styles.layout}>
      <aside className={styles.aside}>
        <div>
          <span className={styles.slabel}>{t('lbl_class', lang)}</span>
          <div className={styles.cgrid}>
            {CLASSES.map((cls, i) => {
              const color = CLASS_COLORS[cls.id] ?? '#c8972a'
              const active = selectedClass?.id === cls.id
              return (
                <button
                  key={cls.id}
                  className={`${styles.cbtn} ${active ? styles.cActive : ''}`}
                  style={{ '--cls-color': color, animationDelay: i * 0.02 + 's' } as React.CSSProperties}
                  onClick={() => pickClass(cls)}
                >
                  <div className={styles.cicon}>
                    <img src={cls.icon} alt={cls.name} onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
                  </div>
                  <span className={styles.cname}>{cls.name}</span>
                </button>
              )
            })}
          </div>
        </div>

        {selectedClass && (
          <div>
            <span className={styles.slabel}>{t('lbl_spec', lang)}</span>
            <div className={styles.slist}>
              {selectedClass.specs.map(spec => {
                const rc = spec.role === 'Tank' ? '#4a9eff' : spec.role === 'Healer' ? '#50d080' : '#ff8040'
                const active = selectedSpec?.id === spec.id
                return (
                  <button key={spec.id} className={`${styles.sbtn} ${active ? styles.sActive : ''}`} onClick={() => pickSpec(spec)}>
                    <div className={styles.sicon}>
                      <img src={spec.icon} alt={spec.name} onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
                    </div>
                    <div>
                      <div className={styles.sname}>{spec.name}</div>
                      <div className={styles.srole} style={{ color: rc }}>{t('role_' + spec.role.toLowerCase(), lang)}</div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </aside>

      <div className={styles.content}>
        {!selectedSpec ? (
          <div className={styles.welcome}>
            <div className={styles.wgem} />
            <h2 style={{ fontFamily: "'Almendra', serif", fontSize: 21 }}>{t('welcome_title', lang)}</h2>
            <p style={{ fontSize: 14, color: 'var(--text2)', maxWidth: 320, lineHeight: 1.7 }}>{t('reco_desc', lang)}</p>
          </div>
        ) : (
          <div>
            <div className={styles.recoTop}>
              <div>
                <h2 className={styles.recoTitle}>{t('reco_title', lang)}</h2>
                <p style={{ fontSize: 12, color: 'var(--text3)' }}>
                  {selectedCharacter
                    ? `${selectedCharacter.name} · ${selectedClass?.name ?? ''} ${selectedSpec?.name ?? ''}`
                    : t('reco_sub', lang)}
                </p>
              </div>
              <div className={styles.modes}>
                {MODES.map(m => (
                  <button key={m.id} className={`${styles.mtab} ${recoMode === m.id ? styles.mActive : ''}`} onClick={() => setRecoMode(m.id)}>
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            <CharacterPanel
              items={reco}
              mode={recoMode}
              onToggle={toggleReco}
            />
          </div>
        )}
      </div>
    </div>
  )
}
