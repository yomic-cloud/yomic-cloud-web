<template>
    <div :class="[$style.container]" class="border-right">
        <div :class="[$style.toolbar]" class="text-right pr-3">
            <!-- <span class="mx-2 icon-btn" @click="onRefresh"><v-icon type="sync"></v-icon></span> -->
            <span class="mx-2 icon-btn" @click="onExpand"><v-icon type="plus-square-o"></v-icon></span>
            <span class="mx-2 icon-btn" @click="onCollapse"><v-icon type="switcher"></v-icon></span>
        </div>
        <v-tree node-key="id" :data-source="dataSource" lazy :load-fn="loadFn" :props="props" ref="tree" :class="[$style.tree]">
            <span slot="content"  slot-scope="{node}" @click="onSelect(node)">
                <file-icon v-bind="iconProps(node)"></file-icon> <span class="ml-2">{{node.data.name}}</span>
            </span>
        </v-tree>
    </div>
</template>

<script lang="ts">

import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
import { TreeNodeLoadFn } from 'vua'
import { queryFiles } from '@/api/file'

@Component
export default class FileTree extends Vue {
    @Prop(Number) id!: number

    @Emit('update:id') updateId (id: number) {}

    props = {
      key: 'id',
      label: 'name'
    }

    dataSource: any = [
      {
        id: -2,
        name: '全部文件',
        dir: true,
        personal: false
      },
      {
        id: -3,
        name: '个人文件',
        dir: true,
        personal: true
      }
    ]

    iconProps (node: any) {
      let dir = node.data.dir
      let personal = node.data.personal
      let root = !(node.parent && node.parent.parent)
      let contentType = node.data.contentType
      return { dir, personal, root, contentType }
    }

    loadFn: TreeNodeLoadFn = ({ node }, resovle) => {
      let parentId = node.data.id
      parentId = parentId < 0 ? -1 : parentId
      let personal = node.data.personal
      let status = true
      let dir = true
      queryFiles({ parentId, personal, status, dir }).then((data) => {
        resovle(data)
      })
    }

    onRefresh () {
    //   this.loadDepts()
    }

    onExpand () {
      const $e = this.$refs.tree as any
      $e.expandAll(true)
    }

    onCollapse () {
      const $e = this.$refs.tree as any
      $e.expandAll(false)
    }

    onSelect (node: any) {
      this.updateId(node.data.id)
    }
}
</script>

<style lang="scss" module>
.container {
    height: calc(100vh - 160px);
    overflow: auto;
}

.toolbar {
    background-color: var(--bg-color-2);
    line-height: 2rem;
    height: 2rem;
}

.tree {
    width: 100%;
    overflow: auto;

    :global{
        .v-tree-node {
            white-space: nowrap;
        }
    }
}
</style>
