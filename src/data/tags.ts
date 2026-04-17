import type { I18nText } from '../types/menu'

interface TagDef {
  icon: string
  label: I18nText
  bg: string
  color: string
}

export const TAG_DEFS: Record<string, TagDef> = {
  R: {
    icon: '⭐',
    label: { zh: '本店推薦', en: 'Recommended', ja: 'おすすめ', ko: '추천' },
    bg: '#FFF8E1',
    color: '#B8860B',
  },
  '1': {
    icon: '🌶️',
    label: { zh: '小辣', en: 'Mild Spicy', ja: '少し辛い', ko: '약간 매운' },
    bg: '#FFF0F0',
    color: '#D93C15',
  },
  '2': {
    icon: '🌶️🌶️',
    label: { zh: '中辣', en: 'Medium Spicy', ja: '中辛', ko: '보통 매운' },
    bg: '#FFE8D0',
    color: '#C05020',
  },
  '3': {
    icon: '🔥',
    label: { zh: '大辣', en: 'Very Spicy', ja: '激辛', ko: '매우 매운' },
    bg: '#FFE8E8',
    color: '#CC0000',
  },
  P: {
    icon: '🐷',
    label: { zh: '含豬肉', en: 'Contains Pork', ja: '豚肉入り', ko: '돼지고기 포함' },
    bg: '#FDECEA',
    color: '#C62828',
  },
  B: {
    icon: '🐂',
    label: { zh: '含牛肉', en: 'Contains Beef', ja: '牛肉入り', ko: '소고기 포함' },
    bg: '#FFF0E8',
    color: '#8B4513',
  },
  L: {
    icon: '🐑',
    label: { zh: '含羊肉', en: 'Contains Lamb', ja: 'ラム入り', ko: '양고기 포함' },
    bg: '#F3E5F5',
    color: '#6A1B9A',
  },
  V: {
    icon: '🥬',
    label: { zh: '素食', en: 'Vegetarian', ja: 'ベジタリアン', ko: '채식' },
    bg: '#E8F5E9',
    color: '#2E7D32',
  },
  H: {
    icon: '☪️',
    label: { zh: '清真認證', en: 'Halal Certified', ja: 'ハラール認証', ko: '할랄 인증' },
    bg: '#E8F4FD',
    color: '#0D47A1',
  },
}
