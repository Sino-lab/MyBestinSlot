import { GUILD_MEMBERS } from '../../../data/guild'
import { SLOT_LABELS } from '../../../data/items'
import { useApp } from '../../../context/AppContext'
import styles from './PlayerView.module.css'

export default function PlayerView() {
  const { lang } = useApp()
  const SL = SLOT_LABELS[lang]

  return (
    <div className={styles.grid}>
      {GUILD_MEMBERS.map(member => {
        const got = member.list.filter(i => i.obtained).length
        const total = member.list.length
        const pct = total > 0 ? Math.round(got / total * 100) : 0

        return (
          <div key={member.name} className={styles.card}>
            <div className={styles.header}>
              <div className={styles.avatar} style={{ background: member.color + '22', color: member.color, border: `1px solid ${member.color}44` }}>
                {member.name[0]}
              </div>
              <div className={styles.nameWrap}>
                <div className={styles.name}>{member.name}</div>
                <div className={styles.cls} style={{ color: member.color }}>{member.cls.charAt(0).toUpperCase() + member.cls.slice(1)} {member.spec}</div>
              </div>
              <div style={{ fontSize: 12, color: 'var(--text3)' }}>{got}/{total}</div>
            </div>
            <div className={styles.prog}>
              <div className={styles.track}><div className={styles.fill} style={{ width: pct + '%', background: member.color }} /></div>
              <span className={styles.pct} style={{ color: member.color }}>{pct}%</span>
            </div>
            <div className={styles.items}>
              {member.list.map(item => {
                const qc = item.q === 'legendary' ? 'var(--legendary)' : item.q === 'epic' ? 'var(--epic)' : 'var(--rare)'
                return (
                  <div key={item.name} className={styles.item}>
                    <div className={styles.dot} style={{ background: item.obtained ? '#4caf50' : qc }} />
                    <span className={`${styles.iname} ${item.obtained ? styles.got : ''}`} style={item.obtained ? {} : { color: qc }}>{item.name}</span>
                    <span className={styles.islot}>{SL[item.slot]}</span>
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
