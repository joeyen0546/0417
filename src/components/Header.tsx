import { useLanguage } from '../hooks/useLanguage'
import { SITE_INFO } from '../data/site-info'

const HERO_IMG = `${import.meta.env.BASE_URL}images/generated-1776397323790.png`

export function Header() {
  const { lang } = useLanguage()

  return (
    <div>
      <div
        style={{
          width: '100%',
          height: 200,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <img
          src={HERO_IMG}
          alt="香茅廚房"
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none'
          }}
        />
      </div>
      <div
        style={{
          background: '#72D350',
          padding: '24px 20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 6,
        }}
      >
        <div
          style={{
            color: '#FFFFFF',
            fontFamily: '"Funnel Sans", sans-serif',
            fontSize: 28,
            fontWeight: 600,
            letterSpacing: 1,
          }}
        >
          {SITE_INFO.nameZh}
        </div>
        <div
          style={{
            color: 'rgba(255,255,255,0.8)',
            fontFamily: 'Inter, sans-serif',
            fontSize: 16,
          }}
        >
          {SITE_INFO.nameEn}
        </div>
        <div
          style={{
            color: 'rgba(255,255,255,0.67)',
            fontFamily: 'Inter, sans-serif',
            fontSize: 12,
            textAlign: 'center',
          }}
        >
          {SITE_INFO.limitInfo[lang]}
        </div>
      </div>
    </div>
  )
}
