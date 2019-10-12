import Vue from 'vue'
import vua from 'vua'
import 'vua/dist/vua.css'
import zhHans from 'vua/src/locale/zh-Hans'
import Util, { Auth, Http } from '@pat-fet/web-vue-utils'
import { login, logout, loadPrinciple } from '@/api/auth'
import SvgPlugin from './svg'
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'
import router from '@/router'

Util.config({
  router
})

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
    baseURL: process.env.VUE_APP_API_BASE_URL,
    map: {
      code: 'code',
      msg: 'message',
      data: 'data',
      successCode: '000000',
      expiredCode: '100000'
    }
  })

  Vue.use(SvgPlugin, {})

  Vue.use(Viewer)
}
