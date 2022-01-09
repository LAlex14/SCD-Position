import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import '@/assets/css/index.scss'
import i18n from "@/i18n";
import store from "@/store";
import globalPlugins from "@/plugins/globalPlugins";
import globalComponents from "@/plugins/globalComponents";
import VueGoogleMaps from "@fawmi/vue-google-maps";

createApp(App)
  .use(store)
  .use(i18n)
  .use(router)
  .use(globalPlugins)
  .use(globalComponents)
  .use(VueGoogleMaps, {
    load: {
      key: "AIzaSyChG3SCmg6Ux8JcmrxzVgFNCawR3BndhVc"
    }
  })
  .mount('#app')

import './modules/common/apiConfig'
