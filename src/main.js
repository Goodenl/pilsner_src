import App from './App.vue'
import CButton from './components/CButton.vue'
import { createApp } from 'vue'
import store from './plugins/store'
import router from './plugins/router'
import globalUrl from './plugins/utils/globalUrl'
import globalLink from './plugins/utils/globalLink'
import Vue3TouchEvents from "vue3-touch-events";
import VueLazyLoad from 'vue3-lazyload'

import { registerSW } from 'virtual:pwa-register'

const updateSW = registerSW({
  // onNeedRefresh() {},
  // onOfflineReady() {
  // 	console.log("Готов в оффлайн")
  // },

  onRegistered(r) {
    r.update()
    r && setInterval(() => {
      r.update()
    }, 60*60*1000)
  }
})

import smoothscroll from 'smoothscroll-polyfill';
smoothscroll.polyfill();

createApp(App)
.use(router)
.use(store)
.use(globalUrl)
.use(globalLink)
.use(Vue3TouchEvents)
.use(VueLazyLoad)
.component("CButton", CButton)
.mount('#app')