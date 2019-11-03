import { RouteConfig } from 'vue-router/types/router'

import { HOME } from '@/helpers/context'

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: `${HOME}`,
    component: () => import('@/views/layout/index.vue'),
    redirect: { path: '/file', query: { id: '-2' } },
    meta: { pid: `${HOME}`, cname: '首页' },
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: { pid: `${HOME}.dashboard`, cname: '仪表盘' }
      },
      {
        path: 'file',
        name: 'file',
        component: () => import('@/views/file/index.vue'),
        meta: { pid: `${HOME}.file`, cname: '全部文件' }
      },
      {
        path: 'link',
        name: 'link',
        component: () => import('@/views/link/index.vue'),
        meta: { pid: `${HOME}.link`, cname: '我的分享' }
      },
      {
        path: 'recycle',
        name: 'recycle',
        component: () => import('@/views/recycle/index.vue'),
        meta: { pid: `${HOME}.recycle`, cname: '回收站' }
      },
      {
        path: 'dept',
        name: 'dept',
        component: () => import('@/views/dept/index.vue'),
        meta: { pid: `${HOME}.dept`, cname: '部门管理' }
      },
      {
        path: 'user',
        name: 'user',
        component: () => import('@/views/user/index.vue'),
        meta: { pid: `${HOME}.user`, cname: '用户管理' }
      },
      // 系统管理
      {
        path: 'system/user',
        name: 'system/user',
        component: () => import('@/views/system/user/index.vue'),
        meta: { pid: `${HOME}.system.user`, cname: '用户管理' }
      },
      // 用户设置
      {
        path: '/user-setting',
        name: 'user-setting',
        component: () => import('@/views/user-setting/index.vue')
      }
    ]
  },
  {
    path: '/share/:id',
    name: 'share',
    component: () => import('@/views/share/index.vue')
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
