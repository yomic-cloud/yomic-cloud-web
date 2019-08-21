import { RouteConfig } from 'vue-router/types/router'

import { HOME } from '@/helpers/context'

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: `${HOME}`,
    component: () => import('@/views/layout/index.vue'),
    meta: { pid: `${HOME}`, cname: '首页' },
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: { pid: `${HOME}.dashboard`, cname: '仪表盘' }
      },
      // 系统管理
      {
        path: 'system/user',
        name: 'system/user',
        component: () => import('@/views/system/user/index.vue'),
        meta: { pid: `${HOME}.system.user`, cname: '用户管理' }
      }
    ]
  },
  // DON'T CHANGE BELOW
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/error/:code',
    name: 'error',
    component: () => import('@/views/error/index.vue')
  },
  {
    path: '',
    redirect: '/'
  },
  {
    path: '*',
    redirect: '/error/404'
  }
]

export default routes
