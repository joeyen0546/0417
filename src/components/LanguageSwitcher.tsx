import { useLanguage } from '../hooks/useLanguage'
import { LANG_LABELS } from '../data/site-info'
import type { Lang } from '../types/menu'

const LANGS: Lang[] = ['zh', 'en', 'ja', 'ko']

export function LanguageSwitcher() {
  const { lang, setLang } = useLanguage()

  return (
    <div
      style={{
        background: '#FFFFFF',
        display: 'flex',
        justifyContent: 'center',
        gap: 8,
        padding: '10px 16px',
        borderBottom: '1px solid #E8E8E8',
      }}
    >
      {LANGS.map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          style={{
            background: lang === l ? '#72D350' : '#E8E8E8',
            color: lang === l ? '#FFFFFF' : '#1A1A1A',
            border: 'none',
            borderRadius: 9999,
            padding: '6px 16px',
            fontSize: 13,
            fontFamily: 'Inter, sans-serif',
            fontWeight: lang === l ? 600 : 400,
            cursor: 'pointer',
            transition: 'background 0.2s, color 0.2s',
          }}
        >
          {LANG_LABELS[l]}
        </button>
      ))}
    </div>
  )
}
