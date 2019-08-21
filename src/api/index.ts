import Vue from 'vue'
import { Http } from '@pat-fet/web-vue-utils'

export function http (): Http {
  return Vue.prototype.$http
}
