import { useApp } from '../../context/AppContext'
import { CLASS_COLORS } from '../../data/classes'
import type { WowCharacter } from '../../types'
import styles from './CharacterSelectModal.module.css'

const CLASS_NAME_TO_ID: Record<string, string> = {
  // English
  'Warrior': 'warrior',
  'Paladin': 'paladin',
  'Hunter': 'hunter',
  'Rogue': 'rogue',
  'Priest': 'priest',
  'Shaman': 'shaman',
  'Mage': 'mage',
  'Warlock': 'warlock',
  'Monk': 'monk',
  'Druid': 'druid',
  'Demon Hunter': 'demonhunter',
  'Evoker': 'evoker',
  'Death Knight': 'deathknight',
  // French (API may return fr_FR)
  'Guerrier': 'warrior',
  'Chasseur': 'hunter',
  'Voleur': 'rogue',
  'Prêtre': 'priest',
  'Chaman': 'shaman',
  'Démoniste': 'warlock',
  'Moine': 'monk',
  'Druide': 'druid',
  'Chasseur de démons': 'demonhunter',
  'Évocateur': 'evoker',
  'Chevalier de la mort': 'deathknight',
}

export function getClassColor(className: string): string {
  const id = CLASS_NAME_TO_ID[className]
  return id ? (CLASS_COLORS[id] ?? '#888888') : '#888888'
}

function CharRow({ char, onSelect }: { char: WowCharacter; onSelect: () => void }) {
  const color = getClassColor(char.class)
  const bgColor = `${color}22`
  const borderColor = `${color}88`

  return (
    <button className={styles.charRow} onClick={onSelect}>
      <span className={styles.colorStrip} style={{ background: color }} />
      <span
        className={styles.avatar}
        style={{ background: bgColor, borderColor, color, position: 'relative', overflow: 'hidden' }}
      >
        {char.name[0].toUpperCase()}
        {char.avatarUrl && (
          <img
            src={char.avatarUrl}
            alt=""
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
            onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
          />
        )}
      </span>
      <span className={styles.charInfo}>
        <span className={styles.charNameRow}>
          <span className={styles.charName}>{char.name}</span>
          <span className={styles.levelBadge}>{char.level}</span>
        </span>
        <span className={styles.charMeta}>
          <span className={styles.realm}>{char.realm}</span>
          <span className={styles.sep}>·</span>
          <span className={styles.className} style={{ color }}>{char.class}</span>
          <span className={styles.sep}>·</span>
          <span className={styles.faction}>
            {char.faction === 'Alliance' ? '🔵' : '🔴'} {char.faction}
          </span>
        </span>
      </span>
    </button>
  )
}

export default function CharacterSelectModal() {
  const { charSelectOpen, setCharSelectOpen, characters, selectedCharacter, setSelectedCharacter } = useApp()

  if (!charSelectOpen) return null

  function handleSelect(char: WowCharacter) {
    setSelectedCharacter(char)
    setCharSelectOpen(false)
  }

  function handleCancel() {
    setCharSelectOpen(false)
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal} role="dialog" aria-modal="true" aria-label="Character selection">
        <div className={styles.header}>
          <h2 className={styles.title}>Choose your character</h2>
          <p className={styles.subtitle}>
            {characters.length} character{characters.length !== 1 ? 's' : ''} found on your account
          </p>
        </div>

        <div className={styles.list}>
          {characters.length === 0 ? (
            <p className={styles.empty}>No characters found on this account.</p>
          ) : (
            characters.map(char => (
              <CharRow
                key={char.id}
                char={char}
                onSelect={() => handleSelect(char)}
              />
            ))
          )}
        </div>

        {selectedCharacter && (
          <div className={styles.footer}>
            <button className={styles.cancelBtn} onClick={handleCancel}>
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
