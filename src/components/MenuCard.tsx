import { useLanguage } from '../hooks/useLanguage'
import { TagBadge } from './TagBadge'
import { MARKET_PRICE } from '../data/site-info'
import type { MenuItem } from '../types/menu'

interface Props {
  item: MenuItem
  onClick: () => void
}

export function MenuCard({ item, onClick }: Props) {
  const { lang } = useLanguage()
  const imgSrc = item.image ? `${import.meta.env.BASE_URL}images/${item.image}` : null

  const renderPrice = () => {
    if (item.price.length === 1 && item.price[0].label === null) {
      const val = item.price[0].value
      if (val === 'market') return <span style={{ color: '#72D350', fontWeight: 600 }}>{MARKET_PRICE[lang]}</span>
      return `NT$${val}`
    }
    return item.price.map((opt, i) => {
      const label = opt.label ? opt.label[lang] : ''
      const val = opt.value === 'market' ? MARKET_PRICE[lang] : `NT$${opt.value}`
      return (
        <span key={i}>
          {i > 0 && <span style={{ color: '#CBD5E1', margin: '0 4px' }}>/</span>}
          {label && <span style={{ color: '#6B7280' }}>{label} </span>}
          <span>{val}</span>
        </span>
      )
    })
  }

  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 12,
        background: '#FFFFFF',
        borderRadius: 12,
        padding: 12,
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        cursor: 'pointer',
        WebkitTapHighlightColor: 'transparent',
      }}
    >
      {/* Image or Emoji */}
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: 10,
          overflow: 'hidden',
          flexShrink: 0,
          background: '#FAF7F2',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {imgSrc ? (
          <img
            src={imgSrc}
            alt={item.names[lang]}
            loading="lazy"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => {
              const parent = (e.target as HTMLElement).parentElement!
              ;(e.target as HTMLElement).style.display = 'none'
              const span = document.createElement('span')
              span.style.fontSize = '32px'
              span.textContent = item.emoji
              parent.appendChild(span)
            }}
          />
        ) : (
          <span style={{ fontSize: 32 }}>{item.emoji}</span>
        )}
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 15,
            fontWeight: 700,
            color: '#1A1A1A',
            marginBottom: 4,
            lineHeight: 1.3,
          }}
        >
          {item.names[lang]}
        </div>
        <div
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 13,
            color: '#4B5563',
            marginBottom: 6,
            lineHeight: 1.5,
            flexWrap: 'wrap',
            display: 'flex',
          }}
        >
          {renderPrice()}
        </div>

        {item.tags.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {item.tags.map((tag) => (
              <TagBadge key={tag} code={tag} />
            ))}
          </div>
        )}

        {item.note[lang] && (
          <div
            style={{
              marginTop: 4,
              fontSize: 11,
              color: '#9CA3AF',
              fontStyle: 'italic',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            {item.note[lang]}
          </div>
        )}
      </div>
    </div>
  )
}
