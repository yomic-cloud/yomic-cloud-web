import Vue from 'vue'
import vua from 'vua'
import 'vua/dist/vua.css'
import zhHans from 'vua/src/locale/zh-Hans'
import { Auth, Http } from '@pat-fet/web-vue-utils'
import { login, logout, loadPrinciple } from '@/api/auth'
import SvgPlugin from './svg'
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'

export default function install (): void {
  Vue.use(vua, {
    lang: {
      locales: { 'zh-Hans': zhHans },
      current: 'zh-Hans'
    }
  })

  Vue.use(Auth, {
    login,
    logout,
    loadPrinciple,
    token: {
      enabled: false
    }
  })
  Vue.use(Http, {
    baseURL: 'http://localhost:3000'
  })

  Vue.use(SvgPlugin, {})

  Vue.use(Viewer)
}
