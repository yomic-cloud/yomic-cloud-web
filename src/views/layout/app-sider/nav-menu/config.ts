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
