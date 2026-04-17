import { TAG_DEFS } from '../data/tags'
import { useLanguage } from '../hooks/useLanguage'

interface Props {
  code: string
}

export function TagBadge({ code }: Props) {
  const { lang } = useLanguage()
  const def = TAG_DEFS[code]
  if (!def) return null

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 3,
        background: def.bg,
        color: def.color,
        borderRadius: 9999,
        padding: '2px 8px',
        fontSize: 11,
        fontFamily: 'Inter, sans-serif',
        fontWeight: 500,
        whiteSpace: 'nowrap',
        lineHeight: 1.4,
      }}
    >
      <span style={{ fontSize: 11 }}>{def.icon}</span>
      {def.label[lang]}
    </span>
  )
}
