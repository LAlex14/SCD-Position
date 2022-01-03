import { createApp } from 'vue'
import App from './App.vue'

import store from './store'
import router from './router'
import { sync } from 'vuex-router-sync'
import i18n from './i18n'

import authMiddleware from "@/modules/auth/middleware/authMiddleware";
import globalPlugins from "./plugins/globalPlugins";
import globalComponents from "./plugins/globalComponents";

authMiddleware(router)
sync(store, router)

const app = createApp(App)
  .use(store)
  .use(i18n)
  .use(router)
  .use(globalPlugins)
  .use(globalComponents)

window.postMessage({
  devtoolsEnabled: true,
  vueDetected: true
}, '*')

app.mount('#app')

import './modules/common/apiConfig'
import './assets/index.scss'
import 'element-plus/lib/theme-chalk/base.css'
import 'element-plus/lib/theme-chalk/el-popper.css'
