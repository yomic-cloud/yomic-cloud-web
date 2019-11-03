import { HOME } from '@/helpers/context'

export interface MenuOption {
    name: string
    icon?: string
    pid?: string,
    link?: string
    children?: Array<MenuOption>
}

export const menus: Array<MenuOption> = [
  {
    name: 'Dashboard',
    icon: 'rocket',
    pid: `${HOME}.dashboard`,
    link: '/dashboard'
  },
  {
    name: '全部文件',
    icon: 'folder-open',
    pid: `${HOME}.file`,
    link: '/file?id=-2'
  },
  {
    name: '我的分享',
    icon: 'share-alt',
    pid: `${HOME}.link`,
    link: '/link'
  },
  {
    name: '回收站',
    icon: 'delete',
    pid: `${HOME}.recycle`,
    link: '/recycle'
  },
  {
    name: '部门管理',
    icon: 'layout',
    pid: `${HOME}.dept`,
    link: '/dept'
  },
  {
    name: '用户管理',
    icon: 'user',
    pid: `${HOME}.user`,
    link: '/user'
  },
  {
    name: '系统管理',
    icon: 'setting',
    pid: `${HOME}.system`,
    children: [
      {
        name: '用户管理',
        pid: `${HOME}.system.user`,
        link: '/system/user'
      }
    ]
  }
]
