import { useState, useRef, useEffect } from 'react'
import { useApp } from '../../../context/AppContext'
import { ALL_ITEMS, SLOT_LABELS, SLOT_FILTERS, SLOT_TYPE } from '../../../data/items'
import { t } from '../../../data/i18n'
import ItemIcon from '../../shared/ItemIcon'
import QualityBadge from '../../shared/QualityBadge'
import type { Item, Mode, SlotType } from '../../../types'
import styles from './AllBis.module.css'

const MODES = [
  { id: 'all' as const, label: 'All' },
  { id: 'mythicplus' as Mode, label: '⚡ M+' },
  { id: 'raid' as Mode, label: '🏰 Raid' },
]

export default function AllBis() {
  const { lang, addToList, removeFromList, isInList, showToast } = useApp()
  const [mode, setMode] = useState<Mode | 'all'>('all')
  const [slotFilter, setSlotFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [acOpen, setAcOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  function getFiltered() {
    let items = [...ALL_ITEMS]
    if (mode !== 'all') items = items.filter(i => i.mode === mode)
    if (slotFilter !== 'all') {
      if (['Armor', 'Jewelry', 'Trinket', 'Weapon'].includes(slotFilter)) {
        const st = slotFilter as SlotType
        if (st === 'Trinket') items = items.filter(i => i.slot.startsWith('trinket'))
        else if (st === 'Weapon') items = items.filter(i => i.slot === 'mainhand' || i.slot === 'offhand')
        else items = items.filter(i => SLOT_TYPE[i.slot] === st)
      } else {
        if (slotFilter === 'ring1') items = items.filter(i => i.slot === 'ring1' || i.slot === 'ring2')
        else if (slotFilter === 'trinket1') items = items.filter(i => i.slot === 'trinket1' || i.slot === 'trinket2')
        else items = items.filter(i => i.slot === slotFilter)
      }
    }
    if (search) {
      const q = search.toLowerCase()
      items = items.filter(i => i.name.toLowerCase().includes(q) || i.source.toLowerCase().includes(q))
    }
    return items
  }

  const filtered = getFiltered()
  const SL = SLOT_LABELS[lang]

  // Group by slot type
  const groups: Record<string, Item[]> = {}
  filtered.forEach(item => {
    const grp = SLOT_TYPE[item.slot] ?? 'Other'
    if (!groups[grp]) groups[grp] = []
    groups[grp].push(item)
  })

  const acMatches = search.length >= 2
    ? ALL_ITEMS.filter(i => i.name.toLowerCase().includes(search.toLowerCase())).slice(0, 6)
    : []

  function toggleItem(item: Item) {
    if (isInList(item.id)) {
      removeFromList(item.id)
      showToast('Removed from your list', 'remove')
    } else {
      addToList(item)
      showToast(`Added: ${item.name}`, 'success')
    }
  }

  const modeLabel = (m: Mode) => m === 'mythicplus' ? '⚡ M+' : m === 'raid' ? '🏰 Raid' : '⛏️ Delves'

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (inputRef.current && !inputRef.current.closest('.' + styles.searchWrap)?.contains(e.target as Node)) {
        setAcOpen(false)
      }
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <div className={styles.topRow}>
          <h2 className={styles.title}>{t('allbis_title', lang)}</h2>
          <div className={styles.modes}>
            {MODES.map(m => (
              <button key={m.id} className={`${styles.mtab} ${mode === m.id ? styles.active : ''}`} onClick={() => setMode(m.id as typeof mode)}>
                {m.label}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.searchWrap} ref={inputRef as any}>
          <span className={styles.searchIcon}>🔍</span>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Search an item..."
            value={search}
            onChange={e => { setSearch(e.target.value); setAcOpen(true) }}
            onFocus={() => setAcOpen(true)}
          />
          {acOpen && acMatches.length > 0 && (
            <div className={styles.ac}>
              {acMatches.map(i => (
                <div key={i.id} className={styles.acItem} onMouseDown={() => { setSearch(i.name); setAcOpen(false) }}>
                  <span style={{ color: `var(--${i.q})`, fontSize: 13 }}>{i.name}</span>
                  <span style={{ fontSize: 11, color: 'var(--text3)', marginLeft: 'auto' }}>{SL[i.slot]} · ilvl {i.ilvl}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={styles.filters}>
          {SLOT_FILTERS.map(f => (
            <button
              key={f.id}
              className={`${styles.chip} ${slotFilter === f.id ? styles.chipActive : ''}`}
              onClick={() => setSlotFilter(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className={styles.meta}>
          <span style={{ color: 'var(--gold)', fontWeight: 500 }}>{filtered.length}</span> items found
        </div>

        <div>
          {Object.entries(groups).map(([grp, items]) => (
            <div key={grp} className={styles.group}>
              <div className={styles.groupTitle}>{grp}</div>
              {items.map((item, idx) => {
                const inList = isInList(item.id)
                return (
                  <div key={item.id} className={`${styles.icard} ${inList ? styles.inList : ''}`} style={{ animationDelay: idx * 0.02 + 's' }}>
                    <ItemIcon slot={item.slot} quality={item.q} />
                    <div className={styles.info}>
                      <div className={styles.name} style={{ color: `var(--${item.q})` }}>{item.name}</div>
                      <div className={styles.meta2}>{SL[item.slot]} · {item.source} · <span style={{ opacity: .7 }}>{modeLabel(item.mode)}</span></div>
                    </div>
                    <QualityBadge quality={item.q} label={`ilvl ${item.ilvl}`} />
                    <button
                      className={`${styles.addBtn} ${inList ? styles.added : ''}`}
                      onClick={() => toggleItem(item)}
                    >
                      {inList ? t('in_my_list', lang) : t('add_to_list', lang)}
                    </button>
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
