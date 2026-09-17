import { createI18n } from 'vue-i18n'
import en from './en'
import zhCN from './zh-CN'

export const SUPPORT_LOCALES = ['en', 'zh-CN'] as const
export type SupportedLocale = (typeof SUPPORT_LOCALES)[number]

const STORAGE_KEY = 'locale'
const DEFAULT_LOCALE: SupportedLocale = 'zh-CN'

function isSupportedLocale(value: string): value is SupportedLocale {
  return (SUPPORT_LOCALES as readonly string[]).includes(value)
}

function detectLocale(): SupportedLocale {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved && isSupportedLocale(saved)) {
    return saved
  }

  const browser = navigator.language
  if (browser.startsWith('zh'))
    return 'zh-CN'
  if (browser.startsWith('en'))
    return 'en'

  return DEFAULT_LOCALE
}

export const i18n = createI18n({
  legacy: false,
  locale: detectLocale(),
  fallbackLocale: 'en',
  messages: {
    'en': en,
    'zh-CN': zhCN,
  },
})

export function setLocale(locale: SupportedLocale) {
  if (i18n.mode === 'composition') {
    i18n.global.locale.value = locale
  }
  localStorage.setItem(STORAGE_KEY, locale)
  document.documentElement.setAttribute('lang', locale)
}
