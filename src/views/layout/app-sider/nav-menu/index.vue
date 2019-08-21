<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { CreateElement, VNode } from 'vue'
import { MenuOption, menus } from './config'
import { MenuCssVariable } from 'vua'
import { AppModule } from '@/store'

@Component
export default class NavMenu extends Vue {
  @Prop(Array) data!: MenuOption[]

  @AppModule.State expand!: boolean

  get current (): MenuOption | null {
    // if (this.$route.path.startsWith())
    let validItems = this.filterByAcl(getLastItems(this.data || menus))
    return validItems.find(v => {
      return !!v.link && this.$route.path.startsWith(v.link)
    }) || null
    function getLastItems (options: Array<MenuOption>): Array<MenuOption> {
      let items: Array<MenuOption> = []
      options.forEach(v => {
        getLast(v)
      })
      return items
      function getLast (item: MenuOption) {
        if (!item.children || item.children.length < 1) {
          if (item.link) items.push(item)
          return
        }
        item.children.forEach(c => {
          getLast(c)
        })
      }
    }
  }

  get activeIndex () {
    return (this.current && this.current.link) || ''
  }

  render (h: CreateElement) {
    let data = {
      props: {
        mode: 'inline',
        defaultActive: this.activeIndex,
        uniqueOpened: true,
        collapse: !this.expand
        // cssVariable: this.cssVariable
      }
    }
    return h('v-menu', data, this.generateList(h, this.data || menus))
  }

  generateList (h: CreateElement, list: MenuOption[]): VNode[] {
    let ret = this.filterByAcl(list).map(v => {
      let childNodes = null
      let children = this.filterByAcl(v.children || [])
      if (v.children) {
        if (children.length > 0) {
          childNodes = h('v-sub-menu', {}, [h('span', { slot: 'title' }, v.name), this.icon(h, v.icon), this.generateList(h, children)])
        } else {
          return null
        }
      } else {
        childNodes = h('v-menu-item', { props: { index: v.link }, 'nativeOn': { click: () => this.link(v.link) } }, [this.icon(h, v.icon), v.name])
      }
      return childNodes
    }).filter(v => !!v) as VNode[]
    return ret
  }

  link (path?: string) {
    if (!path) return
    this.$router.push(path)
  }

  icon (h: CreateElement, name?: string) {
    if (!name) return null
    return h('i', { 'class': ['anticon', `anticon-${name}`], slot: 'icon' })
  }

  filterByAcl (items: Array<MenuOption>): Array<MenuOption> {
    const vm = this
    if (!Array.isArray(items) || items.length < 1) return []
    return items.filter((item: MenuOption) => {
      if (!item.pid) return true
      let has = access(item.pid)
      return has
    })

    function access (pid: string) {
      const authorities = vm.$auth.principle.authorities || []
      return authorities.some((v: any) => v.pid === pid)
    }
  }

  // cssVariable: MenuCssVariable = {
  //   menuBgColor: 'rgb(0, 21, 41)',
  //   menuBorderColor: 'rgb(0, 21, 41)',
  //   // group
  //   menuGroupTextColor: '#999',
  //   // sub
  //   menuSubTitleTextColor: 'rgba(255, 255, 255, 0.65)',
  //   menuSubTitleHoverTextColor: '#fff',
  //   menuSubTitleActiveTextColor: '#fff',
  //   // item
  //   menuItemTextColor: 'rgba(255, 255, 255, 0.65)',
  //   menuItemDisabledTextColor: '#aaa',
  //   menuItemHoverTextColor: '#fff',
  //   menuItemActiveTextColor: '#fff',
  //   menuItemBgColor: 'rgb(0, 12, 23)',
  //   menuItemActiveBgColor: 'primary',
  //   menuItemActiveBorderColor: 'primary'
  // }
}

</script>
