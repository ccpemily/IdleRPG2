import { nextTick } from 'vue'
import { createI18n } from 'vue-i18n'

export async function loadLocale(i18n, locale) {
    const messages = await import(/* @vite-ignore */ './locales/' + locale + '.json')

    i18n.global.setLocaleMessage(locale, messages.default)
    return nextTick()
}

export const i18n = createI18n({
    legacy:false,
    locale: 'zh_cn',
    fallbackLocale: 'zh_cn'
})