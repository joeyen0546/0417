import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../hooks/useLanguage'
import { TagBadge } from './TagBadge'
import { MARKET_PRICE } from '../data/site-info'
import type { MenuItem } from '../types/menu'

interface Props {
  item: MenuItem
  onClose: () => void
}

export function ItemDetailModal({ item, onClose }: Props) {
  const { lang } = useLanguage()
  const imgSrc = item.image ? `${import.meta.env.BASE_URL}images/${item.image}` : null
  const overlayRef = useRef<HTMLDivElement>(null)

  // Pinch-to-zoom state
  const [scale, setScale] = useState(1)
  const lastDist = useRef<number | null>(null)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const getDist = (e: TouchEvent) => {
    const [t1, t2] = [e.touches[0], e.touches[1]]
    return Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      e.preventDefault()
      const dist = getDist(e.nativeEvent)
      if (lastDist.current !== null) {
        const delta = dist / lastDist.current
        setScale((s) => Math.min(4, Math.max(1, s * delta)))
      }
      lastDist.current = dist
    }
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (e.touches.length < 2) {
      lastDist.current = null
    }
  }

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose()
  }

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.5)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'flex-end',
      }}
    >
      {/* Modal card */}
      <div
        style={{
          width: '100%',
          maxHeight: '90vh',
          background: '#FFFFFF',
          borderRadius: '24px 24px 0 0',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Drag handle */}
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 10 }}>
          <div style={{ width: 40, height: 4, borderRadius: 9999, background: '#E5E7EB' }} />
        </div>

        {/* Close button */}
        <div style={{ position: 'absolute', top: 16, right: 16, zIndex: 10 }}>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(0,0,0,0.4)',
              border: 'none',
              borderRadius: 9999,
              width: 36,
              height: 36,
              color: '#FFFFFF',
              fontSize: 16,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ✕
          </button>
        </div>

        {/* Scrollable content */}
        <div style={{ overflowY: 'auto', flex: 1 }}>
          {/* Image / emoji area */}
          <div
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{
              height: 220,
              overflow: 'hidden',
              background: '#F3F4F6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {imgSrc ? (
              <img
                src={imgSrc}
                alt={item.names[lang]}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transform: `scale(${scale})`,
                  transformOrigin: 'center',
                  transition: scale === 1 ? 'transform 0.2s' : 'none',
                  touchAction: 'none',
                }}
                onDoubleClick={() => setScale(s => s > 1 ? 1 : 2)}
              />
            ) : (
              <span style={{ fontSize: 80 }}>{item.emoji}</span>
            )}
          </div>

          {/* Content */}
          <div style={{ padding: '20px 20px 32px' }}>
            {/* Title */}
            <div
              style={{
                fontFamily: '"Funnel Sans", sans-serif',
                fontSize: 22,
                fontWeight: 600,
                color: '#1A1A1A',
                marginBottom: 10,
              }}
            >
              {item.names[lang]}
            </div>

            {/* Tags */}
            {item.tags.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
                {item.tags.map((tag) => (
                  <TagBadge key={tag} code={tag} />
                ))}
              </div>
            )}

            <div style={{ height: 1, background: '#E5E7EB', marginBottom: 16 }} />

            {/* Price options */}
            <div
              style={{
                fontFamily: '"Funnel Sans", sans-serif',
                fontSize: 16,
                fontWeight: 600,
                color: '#1A1A1A',
                marginBottom: 8,
              }}
            >
              {lang === 'zh' ? '價格選項' : lang === 'en' ? 'Price Options' : lang === 'ja' ? '価格オプション' : '가격 옵션'}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
              {item.price.map((opt, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: '#F9FAFB',
                    borderRadius: 10,
                    padding: '12px 16px',
                  }}
                >
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#1A1A1A' }}>
                    {opt.label ? opt.label[lang] : item.names[lang]}
                  </span>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, fontWeight: 600, color: '#1A1A1A' }}>
                    {opt.value === 'market' ? MARKET_PRICE[lang] : `NT$${opt.value}`}
                  </span>
                </div>
              ))}
            </div>

            {/* Desc */}
            {item.desc[lang] && (
              <>
                <div style={{ height: 1, background: '#E5E7EB', marginBottom: 12 }} />
                <div
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 13,
                    color: '#4B5563',
                    lineHeight: 1.6,
                    marginBottom: 16,
                  }}
                >
                  {item.desc[lang]}
                </div>
              </>
            )}

            {/* Note */}
            {item.note[lang] && (
              <>
                <div style={{ height: 1, background: '#E5E7EB', marginBottom: 12 }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 500, color: '#9CA3AF' }}>
                    📋 {lang === 'zh' ? '備註' : lang === 'en' ? 'Note' : lang === 'ja' ? '備考' : '비고'}
                  </span>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#4B5563' }}>
                    {item.note[lang]}
                  </span>
                </div>
              </>
            )}

            <div
              style={{
                marginTop: 20,
                textAlign: 'center',
                fontFamily: 'Inter, sans-serif',
                fontSize: 12,
                color: '#9CA3AF',
              }}
            >
              ⤓ {lang === 'zh' ? '下滑關閉' : lang === 'en' ? 'Swipe down to close' : lang === 'ja' ? '下にスワイプで閉じる' : '아래로 스와이프하여 닫기'}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
