<template>
    <div>
       <div class="mb-2 text-right">
            <v-button type="text" size="sm" color="primary" @click="onAdd">新增权限</v-button>
        </div>
        <v-table :data-source="dataSource">
            <v-table-column prop="filePath" label="文件/文件夹"></v-table-column>
            <v-table-column prop="umask" label="权限">
            <template slot-scope="{row}">{{row.umask | umask}}</template>
            </v-table-column>
            <v-table-column prop="opt" label="操作" fixed="right" width="120px">
                <template slot-scope="{row}">
                    <span class="icon-btn" @click="onEdit(row)"><v-icon type="edit"></v-icon></span>
                    <span class="ml-3 icon-btn" @click="onDelete(row.id)"><v-icon type="delete"></v-icon></span>
                </template>
            </v-table-column>
        </v-table>
        <edit-authority ref="editAuthority"></edit-authority>
    </div>
</template>

<script lang="ts">

import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import EditAuthority from './edit-authority/index.vue'
import { queryAuthorities, deleteAuthority } from '@/api/authority'

@Component({
  components: { EditAuthority }
})
export default class Authority extends Vue {
    @Prop(Number) principleId!: number

    @Prop(Boolean) isUser!: boolean

    dataSource: any[] = []

    onAdd () {
      const $e = this.$refs.editAuthority as EditAuthority
      $e.add(this.principleId, this.isUser).then(() => {
        this.$message.success('添加成功')
        this.loadData()
      })
    }

    onEdit (row: any) {
      const $e = this.$refs.editAuthority as EditAuthority
      $e.edit(row).then(() => {
        this.$message.success('编辑成功')
        this.loadData()
      })
    }

    onDelete (id: number) {
      deleteAuthority(id, false).then(() => {
        this.$message.success('删除成功')
        this.loadData()
      })
    }

    loadData () {
      if (!this.principleId) {
        this.dataSource = []
        return
      }
      queryAuthorities({
        isUser: this.isUser,
        principleId: this.principleId
      }).then(data => {
        this.dataSource = data || []
      })
    }

    @Watch('principleId', { immediate: true }) principleIdChange () {
      this.loadData()
    }
}
</script>
