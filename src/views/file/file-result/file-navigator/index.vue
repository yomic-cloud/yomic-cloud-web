<template>
    <div :class="[$style.container]">
        <v-breadcrumb>
            <span v-show="ellipsis"><v-icon type="ellipsis"></v-icon></span>
            <v-breadcrumb-item :to="to(item, i)" v-for="(item, i) in dataSource" :key="item.id">{{item.name}}</v-breadcrumb-item>
            <span slot="separator"><v-icon type="right"></v-icon></span>
        </v-breadcrumb>
    </div>
</template>

<script lang="ts">

import { Vue, Component, Prop, Emit, Watch } from 'vue-property-decorator'
import { getFile } from '@/api/file'

@Component
export default class FileNavigator extends Vue {
    @Prop(Number) id!: number

    dataSource: any[] = []

    max: number = 4

    get renderDataSource () {
      let len = this.dataSource.length
      let start = len - this.max < 0 ? 0 : len - this.max
      return this.dataSource.slice(start, len)
    }

    get ellipsis () {
      return this.renderDataSource.length < this.dataSource.length
    }

    to (item: any, i: number) {
      if (i >= this.dataSource.length - 1) return undefined
      return `/file?id=${item.id}`
    }

    loadData () {
      const vm = this as any
      if (!this.id) {
        this.dataSource = []
        return
      }
      let ret: any[] = []
      if (this.id < 0) {
        ret.push(generateHome())
        this.dataSource = ret
        return
      }
      getFile(this.id).then(data => {
        let parent = data
        while (parent) {
          ret.splice(0, 0, parent)
          if (!parent.parent) ret.splice(0, 0, generateHome(parent))
          parent = parent.parent as any
        }
        this.dataSource = ret
      })

      function generateHome (file?: any) {
        const all = {
          id: -2,
          name: '全部文件'
        }
        const personal = {
          id: -3,
          name: '个人文件'
        }
        let isPersonal = file ? file.personal : vm.id === -3
        return isPersonal ? personal : all
      }
    }

    @Watch('id', { immediate: true }) idChange (id: number) {
      this.loadData()
    }
}
</script>

<style lang="scss" module>
.container {
    display: flex;
    align-items: center;

    :global {
        .v-breadcrumb-item {
            font-size: 12px;
            max-width: 8rem;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
        }
    }
}
</style>
