import Vue from 'vue'
import vua from 'vua'
import 'vua/dist/vua.css'
import zhHans from 'vua/src/locale/zh-Hans'
import { Auth, Http } from '@pat-fet/web-vue-utils'
import { login, logout, loadPrinciple } from '@/api/auth'

export default function install (): void {
  Vue.use(vua, {
    lang: {
      locales: { 'zh-Hans': zhHans }
    }
  })

  Vue.use(Auth, {
    login,
    logout,
    loadPrinciple
  })
  Vue.use(Http, {
    baseURL: 'http://localhost:3000'
  })
}
