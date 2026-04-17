import type { I18nText, Lang } from '../types/menu'

export const SITE_INFO = {
  nameZh: '香茅廚房',
  nameEn: 'Lemongrass Kitchen',
  address: '花蓮市商校街 115 號',
  phone: '(03) 832-2685',
  limitInfo: {
    zh: '用餐時間限 90 分鐘 ｜ 每人低消 NT$300',
    en: 'Dining limit: 90 min ｜ Min. spend: NT$300/person',
    ja: '食事時間は 90 分まで ｜ お一人様 NT$300 以上',
    ko: '식사 시간 90분 제한 ｜ 1인 최소 주문 NT$300',
  } as I18nText,
}

export const CATEGORY_NAMES: Record<string, I18nText> = {
  main: { zh: '主餐類', en: 'Mains', ja: 'メインディッシュ', ko: '메인요리' },
  side: { zh: '單點類', en: 'Sides', ja: 'サイドメニュー', ko: '사이드메뉴' },
  dessert: { zh: '甜點類', en: 'Desserts', ja: 'デザート', ko: '디저트' },
  drink: { zh: '飲料類', en: 'Drinks', ja: 'ドリンク', ko: '음료' },
}

export const LANG_LABELS: Record<Lang, string> = {
  zh: '繁中',
  en: 'EN',
  ja: '日本語',
  ko: '한국어',
}

export const MARKET_PRICE: I18nText = {
  zh: '時價',
  en: 'Market Price',
  ja: '時価',
  ko: '시가',
}
