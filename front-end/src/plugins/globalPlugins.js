import NotificationPlugin from '@/components/common/NotificationPlugin/index'
import ModalPlugin from '@/components/common/dialog/modalPlugin'
import focusDirective from '@/directives/focus.js'
import VeeValidate from "@/plugins/veeValidate";
import { ElLoading } from 'element-plus'

export default {
  install(Vue) {
    Vue.use(ModalPlugin)
    Vue.use(NotificationPlugin)
    Vue.use(VeeValidate)
    Vue.directive('focus', focusDirective)
    Vue.directive('loading', ElLoading.directive)
    Vue.mixin({
      computed: {
        $user() {
          return this.$store.state.auth?.user || {}
        },
      }
    })
  }
}
