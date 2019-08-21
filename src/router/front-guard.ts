import { NavigationGuard } from 'vue-router'
import Vue from 'vue'
import NP from 'nprogress'

const whiteList = ['/login', '/error/**'] // ant style wildcat

const frontGuard: NavigationGuard = function (to, from, next) {
  NP.start()
  if (onWhiteList(to.path)) {
    next()
    return
  }
  Vue.prototype.$auth.access(to.meta && to.meta.pid).then((ret: boolean) => {
    if (ret) {
      next()
    } else {
      next({ path: '/error/403' })
      NP.done()
    }
  }).catch(() => {
    NP.done()
  })
}

function onWhiteList (path: string) {
  const convertRegEx = (expr: string) => {
    return new RegExp('^' +
      (expr || '')
        .replace(/\*\*/g, '#__#')
        .replace(/\*/g, '[^/]*')
        .replace(/#__#/g, '.*') +
      '$')
  }
  return whiteList.some(v => convertRegEx(v).test(path))
}

export default frontGuard
