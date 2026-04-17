import { useLanguage } from '../hooks/useLanguage'
import { CATEGORY_NAMES } from '../data/site-info'
import { MenuCard } from './MenuCard'
import type { Category, MenuItem } from '../types/menu'

interface Props {
  category: Category
  items: MenuItem[]
  onSelectItem: (item: MenuItem) => void
}

export function MenuSection({ category, items, onSelectItem }: Props) {
  const { lang } = useLanguage()

  return (
    <div
      id={`section-${category}`}
      style={{ padding: '24px 16px 0 16px' }}
    >
      {/* Section header */}
      <div
        style={{
          borderLeft: '3px solid #72D350',
          paddingLeft: 12,
          marginBottom: 12,
        }}
      >
        <span
          style={{
            fontFamily: '"Funnel Sans", sans-serif',
            fontSize: 18,
            fontWeight: 600,
            color: '#1A1A1A',
          }}
        >
          {CATEGORY_NAMES[category][lang]}
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {items.map((item) => (
          <MenuCard key={item.id} item={item} onClick={() => onSelectItem(item)} />
        ))}
      </div>
    </div>
  )
}
