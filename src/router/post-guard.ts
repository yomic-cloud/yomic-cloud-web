import { Route } from 'vue-router'
import NP from 'nprogress'

const postGuard = function (to: Route, from: Route): any {
  NP.done()
}

export default postGuard
