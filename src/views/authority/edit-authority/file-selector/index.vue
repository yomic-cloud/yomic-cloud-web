<template>
  <div>
    <div class="mb-3"><span class="text-secondary">已选择文件：</span> <span class="ml-3 text-info">{{file && file.name}}</span></div>
    <v-tree node-key="key" :data-source="dataSource" lazy :load-fn="loadFn" ref="tree" :class="[$style.tree]">
      <template slot="indicator" slot-scope="{node}">
        <file-icon v-bind="iconProps(node.data)"></file-icon>
      </template>
      <div slot="content"  slot-scope="{node}" @click="onSelect(node)">
        <span>{{node.data.label}}</span>
      </div>
    </v-tree>
  </div>
</template>

<script lang="ts">

import { Vue, Component, Prop, Emit, Watch } from 'vue-property-decorator'
import { queryFiles, getFile } from '@/api/file'
import { toCascade } from '@/helpers/data'

@Component
export default class FileSelector extends Vue {
  @Prop(Number) id!: number

  @Prop(Boolean) readonly!: boolean

  @Emit('update:id') updateId (id: number) {}

  file: any = null

  dataSource: any[] = []

  iconProps (row: any) {
    let dir = row.dir
    let personal = row.personal
    let root = false
    let contentType = row.contentType
    return { dir, personal, root, contentType }
  }

  loadFn = ({ node }: any, resovle: any) => {
    let parentId = node.data.id
    queryFiles({ parentId }).then(data => {
      resovle((data || []).map(v => Object.assign(v, { key: v.id, label: v.name })))
    })
  }

  onSelect (node: any) {
    if (this.readonly) return
    this.file = node.data
    this.updateId(node.data.id)
  }

  loadData () {
    queryFiles({ parentId: -1, personal: false }).then(data => {
      this.dataSource = (data || []).map(v => {
        return Object.assign(v, { key: v.id, label: v.name })
      })
    })
  }

  loadFile () {
    if (!this.id) {
      this.file = null
      return
    }
    if (this.file && this.id === this.file.id) return
    getFile(this.id).then(data => {
      this.file = data || null
    })
  }

  mounted () {
    this.loadData()
  }

  @Watch('id', { immediate: true }) idChange () {
    this.loadFile()
  }
}
</script>

<style lang="scss" module>
.tree {
  overflow: auto;
}
</style>
