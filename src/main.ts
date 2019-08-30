import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import install from './plugins'
import 'nprogress/nprogress.css'
import '@/styles/index.scss'
import '@/components'

Vue.config.productionTip = false

install()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
