import Vue from 'vue'
import Router from 'vue-router'

import routes from './routes'
import frontGuard from './front-guard'
import postGuard from './post-guard'

Vue.use(Router)

const router = new Router({ routes })
router.beforeEach(frontGuard)
router.afterEach(postGuard)

export default router
