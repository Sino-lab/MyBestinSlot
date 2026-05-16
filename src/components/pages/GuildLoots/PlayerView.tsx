import { useGuild } from '../../../context/GuildContext'
import { CLASS_COLORS } from '../../../data/classes'
import styles from './PlayerView.module.css'

export default function PlayerView() {
  const { currentGroup } = useGuild()
  const members = currentGroup()?.members ?? []

  if (!members.length) {
    return <p style={{ padding: '2rem', color: 'var(--text3)', textAlign: 'center' }}>Aucun membre dans ce groupe.</p>
  }

  return (
    <div className={styles.grid}>
      {members.map(member => {
        const color = CLASS_COLORS[member.cls] ?? '#aaaaaa'
        return (
          <div key={member.name} className={styles.card}>
            <div className={styles.header}>
              <div className={styles.avatar} style={{ background: color + '22', color, border: `1px solid ${color}44` }}>
                {member.name[0]}
              </div>
              <div className={styles.nameWrap}>
                <div className={styles.name}>{member.name}</div>
                <div className={styles.cls} style={{ color }}>
                  {member.cls.charAt(0).toUpperCase() + member.cls.slice(1)}
                  {member.isOwner ? ' 👑' : member.isAdmin ? ' ⚡' : ''}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
