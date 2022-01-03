import { createI18n } from 'vue-i18n'
import enLocale from 'element-plus/lib/locale/lang/en'
import en from './locales/en.json'

const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    el: enLocale.el,
    en,
  },
  silentTranslationWarn: true,
})

export default {
  i18n,
  install(Vue) {
    Vue.config.globalProperties.$t = i18n.global.t
    Vue.config.globalProperties.$i18n = i18n
  },
  t: i18n.global.t
}
