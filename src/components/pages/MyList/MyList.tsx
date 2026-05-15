import { useState } from 'react'
import { useApp } from '../../../context/AppContext'
import { SLOT_LABELS } from '../../../data/items'
import { t } from '../../../data/i18n'
import type { MyListItem } from '../../../types'
import ExportModal from '../../modals/ExportModal'
import ItemIcon from '../../shared/ItemIcon'
import QualityBadge from '../../shared/QualityBadge'
import styles from './MyList.module.css'

type Filter = 'all' | 'todo' | 'obtained'
type GroupBy = 'none' | 'source' | 'mode' | 'slot'

function sourceIcon(src: string) {
  const s = src.toLowerCase()
  if (s.includes('craft')) return '⚒️'
  if (s.includes('vault')) return '🏛️'
  if (s.includes('delve') || s.includes('underkeep')) return '⛏️'
  if (['fyrakk','gnarloot','smolderon','nymue','volcoross','larodar','council','igira','tindral'].some(n => s.includes(n))) return '🔥'
  if (s.includes('mythic')) return '⚡'
  if (s.includes('dawn') || s.includes('infinite')) return '🌀'
  if (s.includes('amirdrassil')) return '🌳'
  return '📍'
}

function modeLabel(mode: string) {
  return mode === 'mythicplus' ? '⚡ M+' : mode === 'raid' ? '🏰 Raid' : '⛏️ Delves'
}
function modeCls(mode: string) {
  return mode === 'mythicplus' ? styles.tagMp : mode === 'raid' ? styles.tagRaid : styles.tagDel
}

export default function MyList() {
  const { lang, myList, toggleObtained, removeFromList, showToast, showTooltip, hideTooltip } = useApp()
  const [filter, setFilter] = useState<Filter>('all')
  const [groupBy, setGroupBy] = useState<GroupBy>('none')
  const [exportOpen, setExportOpen] = useState(false)
  const SL = SLOT_LABELS[lang]

  const total = myList.length
  const got = myList.filter(i => i.obtained).length
  const pct = total > 0 ? Math.round(got / total * 100) : 0

  let items = [...myList]
  if (filter === 'todo') items = items.filter(i => !i.obtained)
  if (filter === 'obtained') items = items.filter(i => i.obtained)

  function handleRemove(item: MyListItem) {
    removeFromList(item.id)
    showToast(`Removed: ${item.name}`, 'remove')
  }

  function renderItem(item: MyListItem, idx: number) {
    const isCrafted = item.source?.toLowerCase().includes('craft')
    return (
      <div
        key={item.id}
        className={`${styles.item} ${item.obtained ? styles.obtained : ''}`}
        style={{ animationDelay: idx * 0.025 + 's' }}
        onMouseEnter={e => showTooltip(item, e.clientX, e.clientY)}
        onMouseMove={e => showTooltip(item, e.clientX, e.clientY)}
        onMouseLeave={hideTooltip}
      >
        <div className={`${styles.chk} ${item.obtained ? styles.chkDone : ''}`} onClick={() => toggleObtained(item.id)}>
          {item.obtained ? '✓' : ''}
        </div>
        <ItemIcon slot={item.slot} quality={item.q} name={item.name} size={32} />
        <div className={styles.info}>
          <div className={styles.name} style={{ color: `var(--${item.q})` }}>{item.name}</div>
          <div className={styles.tags}>
            <span className={`${styles.tag} ${styles.tagSlot}`}>{SL[item.slot]}</span>
            <span className={`${styles.tag} ${isCrafted ? styles.tagCraft : styles.tagSrc}`}>{sourceIcon(item.source)} {item.source}</span>
            <span className={`${styles.tag} ${modeCls(item.mode)}`}>{modeLabel(item.mode)}</span>
          </div>
        </div>
        <QualityBadge quality={item.q} label={`ilvl ${item.ilvl}`} />
        <button className={styles.remove} onClick={() => handleRemove(item)} title="Remove">×</button>
      </div>
    )
  }

  function renderGrouped() {
    const groups: Record<string, MyListItem[]> = {}
    items.forEach(item => {
      let key = ''
      if (groupBy === 'source') key = item.source || 'Unknown'
      else if (groupBy === 'mode') key = modeLabel(item.mode)
      else if (groupBy === 'slot') key = SL[item.slot] || item.slot
      if (!groups[key]) groups[key] = []
      groups[key].push(item)
    })

    let gIdx = 0
    return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b)).map(([key, gitems]) => {
      const icon = groupBy === 'source' ? sourceIcon(key)
        : groupBy === 'mode' ? (key.includes('M+') ? '⚡' : key.includes('Raid') ? '🏰' : '⛏️')
        : '📦'
      return (
        <div key={key} className={styles.srcGroup}>
          <div className={styles.srcHeader}>
            <span style={{ fontSize: 15 }}>{icon}</span>
            <span className={styles.srcName}>{key}</span>
            <span className={styles.srcCount}>{gitems.filter(i => i.obtained).length}/{gitems.length}</span>
          </div>
          {gitems.map(item => renderItem(item, gIdx++))}
        </div>
      )
    })
  }

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <div className={styles.topRow}>
          <h2 className={styles.title}>{t('mylist_title', lang)}</h2>
          <button className={styles.expBtn} onClick={() => setExportOpen(true)}>
            📤 {t('export_btn', lang)}
          </button>
        </div>

        <div className={styles.stats}>
          <div className={styles.scard}><div className={styles.sv}>{pct}%</div><div className={styles.sl}>{t('overall_progress', lang)}</div></div>
          <div className={styles.scard}><div className={styles.sv} style={{ color: '#70d070' }}>{got}</div><div className={styles.sl}>{t('obtained', lang)}</div></div>
          <div className={styles.scard}><div className={styles.sv}>{total}</div><div className={styles.sl}>{t('items_tracked', lang)}</div></div>
        </div>

        {total > 0 && (
          <div className={styles.pbar}>
            <div className={styles.ptrack}><div className={styles.pfill} style={{ width: pct + '%' }} /></div>
            <span className={styles.ppct}>{pct}%</span>
          </div>
        )}

        <div className={styles.controls}>
          <span className={styles.flabel}>{t('filter_by', lang)}:</span>
          {([['all','all'],['todo','to_get'],['obtained','obtained_f']] as [Filter,string][]).map(([id, key]) => (
            <button key={id} className={`${styles.chip} ${filter === id ? styles.chipActive : ''}`} onClick={() => setFilter(id)}>
              {t(key, lang)}
            </button>
          ))}
          <span style={{ flex: 1 }} />
          <span className={styles.gbLabel}>Group by</span>
          {(['none','source','mode','slot'] as GroupBy[]).map(g => (
            <button key={g} className={`${styles.gbtn} ${groupBy === g ? styles.gbtnActive : ''}`} onClick={() => setGroupBy(g)}>
              {g === 'none' ? 'None' : g === 'source' ? '📍 Source' : g.charAt(0).toUpperCase() + g.slice(1)}
            </button>
          ))}
        </div>

        {total === 0 ? (
          <div className={styles.empty}>
            <div style={{ fontSize: 32 }}>📋</div>
            <p>{t('ml_empty', lang)}</p>
          </div>
        ) : items.length === 0 ? (
          <p style={{ color: 'var(--text3)', textAlign: 'center', padding: '2rem' }}>
            {filter === 'todo' ? 'All items obtained! 🎉' : 'No items obtained yet.'}
          </p>
        ) : groupBy === 'none' ? (
          items.map((item, idx) => renderItem(item, idx))
        ) : (
          renderGrouped()
        )}
      </div>

      <ExportModal open={exportOpen} onClose={() => setExportOpen(false)} />
    </div>
  )
}
