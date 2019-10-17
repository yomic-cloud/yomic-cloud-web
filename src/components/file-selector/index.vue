<template>
  <div>
    <!-- <div class="mb-3"><span class="text-secondary">已选择文件：</span> <span class="ml-3 text-info">{{file && file.name}}</span></div> -->
    <div class="m-2 p-2 border rounded" :class="[$style.tagBox]">
      <v-tag v-for="row in files" :key="row.id" shape="round" color="primary" closable @close="onRemove(row.id)">{{row.name}}</v-tag>
    </div>
    <v-tree node-key="id" checkable :data-source="dataSource" lazy :load-fn="loadFn"
      :disabled="disabled" @check="onCheck" check-strictly ref="tree" :class="[$style.tree]">
      <div slot="content"  slot-scope="{node}">
        <span><file-icon v-bind="iconProps(node.data)" class="mr-2"></file-icon>{{node.data.label}}</span>
      </div>
    </v-tree>
  </div>
</template>

<script lang="ts">

import { Vue, Component, Prop, Emit, Watch } from 'vue-property-decorator'
import { queryFiles, getFile } from '@/api/file'
import { toCascade } from '@/helpers/data'
import { unique } from '@/helpers/lang'
import { Node } from 'vua'

@Component
export default class FileSelector extends Vue {
  @Prop(Array) ids!: number[]

  @Prop(Boolean) disabled!: boolean

  @Prop(Boolean) multiple!: boolean

  @Emit('update:ids') updateIds (ids: number[]) {}

  dataSource: any[] = []

  treeFileMap: any = {}

  defaultFileMap: any = {}

  get checkable () {
    return this.multiple
  }

  get files () {
    return this.ids.map(v => {
      let ret = this.defaultFileMap[v] || this.treeFileMap[v]
      return ret
    }).filter(v => v)
  }

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
      this.putInTreeFileMap(data)
      resovle((data || []).map(v => Object.assign(v, { key: v.id, label: v.name })))
    })
  }

  onCheck (node: Node) {
    const vm = this
    this.$nextTick(() => {
      if (!this.multiple) {
        vm.setCheckedKeys([node.data.id])
      } else {
        removeCascade(node)
      }
      this.$nextTick(() => {
        this.fetchCheckedKeys()
      })
    })

    function removeCascade (node: Node) {
      const ids = vm.ids
      if (getParentIn(ids, node)) {
        vm.setCheckedKeys(ids)
        return
      }
      let chs = getChildrenIn(ids, node)
      if (chs.length > 0) {
        let keys = ids.filter(v => !chs.includes(v))
        keys.push(node.data.id)
        vm.setCheckedKeys(keys)
      }
    }

    function getParentIn (keys: number[], node: Node) {
      let temp = node.parent
      while (temp) {
        let ret = keys.find(v => v === (temp && temp.data.id))
        if (ret) return ret
        temp = temp.parent
      }
      return null
    }

    function getChildrenIn (keys: number[], node: Node) {
      let ret: number[] = []
      ;(node.children || []).forEach(v => traverse(v))
      return ret
      function traverse (obj: Node) {
        let id = keys.find(v => v === obj.data.id)
        if (id) ret.push(id)
        const ch = obj.children || []
        ch.forEach(v => traverse(v))
      }
    }
  }

  loadData () {
    return queryFiles({ parentId: -1, personal: false }).then(data => {
      this.dataSource = (data || []).map(v => {
        return Object.assign(v, { key: v.id, label: v.name })
      })
      this.putInTreeFileMap(data)
    })
  }

  loadDefaultFileMap () {
    let all = this.ids.map(v => getFile(v))
    Promise.all(all).then(ret => {
      let map: any = {}
      ret.forEach(v => {
        map[v.id] = v
      })
      this.defaultFileMap = map
    })
  }

  setCheckedKeys (keys: number[]) {
    let ids = keys.filter(v => !!this.treeFileMap[v])
    const $e = this.$refs.tree as any
    if (ids.length < 1) {
      $e.setCheckedNodes([]) // TODO use this, because vua has some issue in here, to be fixed
    } else {
      $e.setCheckedKeys(unique(ids))
    }
  }

  fetchCheckedKeys () {
    const $e = this.$refs.tree as any
    let keys = $e.getCheckedKeys()
    let extraKeys = this.ids.filter(v => !this.treeFileMap[v])
    this.updateIds(unique([...keys, ...extraKeys]))
  }

  putInTreeFileMap (ret: any[] = []) {
    ret.forEach(v => {
      this.treeFileMap[v.id] = v
    })
    this.$nextTick(() => {
      this.$nextTick(() => {
        this.setCheckedKeys(this.ids)
      })
    })
  }

  mounted () {
    this.loadData()
    this.loadDefaultFileMap()
  }

  onRemove (id: number) {
    let ret = this.ids.filter(v => v !== id)
    this.updateIds(ret)
    this.setCheckedKeys(ret)
  }
}
</script>

<style lang="scss" module>
.tree {
  overflow: auto;
  height: 320px;
}

.tagBox {
  min-height: 36px;
  max-height: 64px;
  overflow: auto;
}
</style>
