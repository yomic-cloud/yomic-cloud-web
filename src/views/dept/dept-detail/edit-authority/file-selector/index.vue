<template>
  <div>
    <v-tree node-key="key" default-expand-all :data-source="dataSource" ref="tree"></v-tree>
  </div>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator'
import { queryFiles } from '@/api/file'
import { toCascade } from '@/helpers/data'

@Component
export default class FileSelector extends Vue {
  dataSource: any[] = []

  loadFiles () {
    queryFiles({}).then(data => {
      let tree = (data || []).map(v => {
        return Object.assign(v, { key: v.id, label: v.name })
      })
      this.dataSource = toCascade(tree, 'id', 'parentId').slice(2)
    })
  }

  mounted () {
    this.loadFiles()
  }
}
</script>

<style lang="scss" module>

</style>
