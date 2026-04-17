import { useLanguage } from '../hooks/useLanguage'
import { CATEGORY_NAMES } from '../data/site-info'
import type { Category } from '../types/menu'

const CATEGORIES: Category[] = ['main', 'side', 'dessert', 'drink']

interface Props {
  activeCategory: Category
}

export function CategoryNav({ activeCategory }: Props) {
  const { lang } = useLanguage()

  const scrollTo = (cat: Category) => {
    const el = document.getElementById(`section-${cat}`)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div
      style={{
        background: '#FFFFFF',
        display: 'flex',
        borderBottom: '1px solid #E8E8E8',
      }}
    >
      {CATEGORIES.map((cat) => {
        const active = activeCategory === cat
        return (
          <button
            key={cat}
            onClick={() => scrollTo(cat)}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              borderBottom: active ? '2px solid #72D350' : '2px solid transparent',
              padding: '12px 0',
              color: active ? '#72D350' : '#4B5563',
              fontFamily: '"Funnel Sans", sans-serif',
              fontSize: 14,
              fontWeight: active ? 600 : 400,
              cursor: 'pointer',
              transition: 'color 0.2s, border-color 0.2s',
            }}
          >
            {CATEGORY_NAMES[cat][lang]}
          </button>
        )
      })}
    </div>
  )
}
