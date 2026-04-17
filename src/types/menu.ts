export type Lang = 'zh' | 'en' | 'ja' | 'ko'

export type I18nText = Record<Lang, string>

export type Category = 'main' | 'side' | 'dessert' | 'drink'

export interface PriceOption {
  label: I18nText | null
  value: number | 'market'
}

export interface MenuItem {
  id: string
  category: Category
  names: I18nText
  price: PriceOption[]
  image: string | null
  emoji: string
  tags: string[]
  desc: I18nText
  note: I18nText
}
