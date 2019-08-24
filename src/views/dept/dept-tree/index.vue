<template>
    <div :class="[$style.container]" class="border-right">
        <div :class="[$style.toolbar]" class="text-right pr-3">
            <span class="mx-2 icon-btn" @click="onRefresh"><v-icon type="sync"></v-icon></span>
            <span class="mx-2 icon-btn" @click="onExpand"><v-icon type="plus-square-o"></v-icon></span>
            <span class="mx-2 icon-btn" @click="onCollapse"><v-icon type="switcher"></v-icon></span>
        </div>
        <v-tree node-key="key" :data-source="dataSource" ref="tree" :class="[$style.tree]" class="mt-3">
            <div slot="content"  slot-scope="{node}" :class="[$style.content]" class="d-flex justify-content-between">
                <span class="mr-4">{{node.data.label}}</span>
                <div @click.stop="" class="_flag_actions">
                    <span class="icon-btn" @click="onAdd(node.data)"><v-icon type="plus"></v-icon></span>
                    <span class="ml-2 icon-btn" @click="onEdit(node)"><v-icon type="edit"></v-icon></span>
                    <span class="ml-2 icon-btn" @click="onDelete(node.data)"><v-icon type="delete"></v-icon></span>
                </div>
            </div>
        </v-tree>

        <edit-dept ref="editDept"></edit-dept>
    </div>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator'
import { queryDepts, deleteDept } from '@/api/dept'
import { toCascade } from '@/helpers/data'
import EditDept from './edit-dept/index.vue'

const mapper = (dept: any) => {
  let ret: any = {
    get key () {
      return dept.id
    },
    get label () {
      return dept.name
    }
  }
  return Object.assign(ret, dept)
}

@Component({
  components: { EditDept }
})
export default class DeptTree extends Vue {
    dataSource: any[] = []

    onAdd (parent: any) {
      const $e = this.$refs.editDept as EditDept
      $e.add(parent).then(() => {
        this.$message.success('添加成功')
        this.loadDepts()
      })
    }

    onEdit (node: any) {
      const $e = this.$refs.editDept as EditDept
      $e.edit(node.data, node.parent && node.parent.data).then(() => {
        this.$message.success('编辑成功')
        this.loadDepts()
      })
    }

    onDelete (dept: any) {
      this.$modal.confirm({
        title: '确认删除',
        content: `确认删除部门 [${dept && dept.name}] ?`
      }).then(() => {
        return deleteDept(dept.id)
      }).then(() => {
        this.$message.success('删除成功')
        this.loadDepts()
      })
    }

    onRefresh () {
      this.loadDepts()
    }

    onExpand () {
      const $e = this.$refs.tree as any
      $e.expandAll(true)
    }

    onCollapse () {
      const $e = this.$refs.tree as any
      $e.expandAll(false)
    }

    loadDepts () {
      queryDepts({}).then(data => {
        this.dataSource = toCascade((data || []).map(mapper))
      })
    }

    mounted () {
      this.loadDepts()
    }
}
</script>

<style lang="scss" module>
.container {
    min-height: calc(100vh - 160px);
}

.toolbar {
    background-color: var(--bg-color-2);
    line-height: 2rem;
    height: 2rem;
}

.tree {
    :global {
        .v-tree-node__text:hover {
            ._flag_actions {
                visibility: visible;
            }
        }
        .v-tree-node__text {
            ._flag_actions {
                visibility: hidden;
            }
        }
    }
}

.content {
    // width: 240px;
}
</style>
