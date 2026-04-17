import { useEffect, useRef, useState } from 'react'
import { LanguageContext, useLanguageState } from './hooks/useLanguage'
import { Header } from './components/Header'
import { LanguageSwitcher } from './components/LanguageSwitcher'
import { CategoryNav } from './components/CategoryNav'
import { MenuSection } from './components/MenuSection'
import { ItemDetailModal } from './components/ItemDetailModal'
import { menuItems } from './data/menu-i18n'
import type { Category, MenuItem } from './types/menu'

const CATEGORIES: Category[] = ['main', 'side', 'dessert', 'drink']

export default function App() {
  const { lang, setLang } = useLanguageState()
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null)
  const [activeCategory, setActiveCategory] = useState<Category>('main')
  const stickyRef = useRef<HTMLDivElement>(null)

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const stickyHeight = stickyRef.current?.offsetHeight ?? 0
      for (const cat of [...CATEGORIES].reverse()) {
        const el = document.getElementById(`section-${cat}`)
        if (el) {
          const top = el.getBoundingClientRect().top
          if (top <= stickyHeight + 40) {
            setActiveCategory(cat)
            break
          }
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const itemsByCategory = (cat: Category) => menuItems.filter((i) => i.category === cat)

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      <div style={{ maxWidth: 375, margin: '0 auto', background: '#FAF7F2', minHeight: '100vh' }}>
        <Header />

        {/* Sticky controls */}
        <div
          ref={stickyRef}
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 100,
            background: '#FFFFFF',
            boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
          }}
        >
          <LanguageSwitcher />
          <CategoryNav activeCategory={activeCategory} />
        </div>

        {/* Menu sections */}
        <div style={{ paddingBottom: 32 }}>
          {CATEGORIES.map((cat) => (
            <MenuSection
              key={cat}
              category={cat}
              items={itemsByCategory(cat)}
              onSelectItem={setSelectedItem}
            />
          ))}

          {/* Ribbon divider between dessert and drink is handled by section spacing */}
          {/* Footer */}
          <div
            style={{
              padding: '24px 16px 8px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <div style={{ width: 60, height: 2, borderRadius: 9999, background: '#72D350' }} />
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#9CA3AF' }}>
              📍 {import.meta.env.VITE_ADDRESS ?? '花蓮市商校街 115 號'}
            </div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#9CA3AF' }}>
              📞 (03) 832-2685
            </div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#BCBCBC', textAlign: 'center' }}>
              ⏰ 用餐時間限 90 分鐘 ｜ 每人低消 NT$300
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedItem && (
        <ItemDetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </LanguageContext.Provider>
  )
}
