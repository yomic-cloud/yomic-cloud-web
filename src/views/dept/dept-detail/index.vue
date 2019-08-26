<template>
    <div class="p-3">
        <v-card title="基本信息" class="mb-4">
            <div v-if="dept">
                <span>
                    <span>部门名称: <span>{{dept && dept.name}}</span></span>
                </span>
            </div>
        </v-card>

        <v-card title="文件权限列表">
            <div v-if="dept">
              <div class="mb-2 text-right">
                <v-button type="primary" @click="onAdd">新增权限</v-button>
              </div>
              <v-table :data-source="authorities">
                  <v-table-column prop="fileName" label="文件/文件夹"></v-table-column>
                  <v-table-column prop="umask" label="权限"></v-table-column>
                  <v-table-column prop="opt" label="操作" fixed="right" width="120px">
                      <template slot-scope="{row}">
                          <span class="icon-btn" @click="onEdit(row)"><v-icon type="edit"></v-icon></span>
                          <span class="ml-3 icon-btn" @click="onDelete(row.id)"><v-icon type="delete"></v-icon></span>
                      </template>
                  </v-table-column>
              </v-table>
            </div>
        </v-card>

        <edit-authority ref="editAuthority"></edit-authority>
    </div>
</template>

<script lang="ts">

import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { getDept } from '@/api/dept'
import { queryAuthorities, deleteAuthority } from '@/api/authority'
import EditAuthority from './edit-authority/index.vue'

@Component({
  components: { EditAuthority }
})
export default class DeptDetail extends Vue {
    @Prop(Number) id!: number

    dept: any = null

    authorities: any[] = []

    onAdd () {
      const $e = this.$refs.editAuthority as EditAuthority
      $e.add().then(() => {
        this.$message.success('添加成功')
        this.loadAuthorities()
      })
    }

    onEdit (row: any) {
      const $e = this.$refs.editAuthority as EditAuthority
      $e.edit(row).then(() => {
        this.$message.success('编辑成功')
        this.loadAuthorities()
      })
    }

    onDelete (id: number) {
      deleteAuthority(id, false).then(() => {
        this.$message.success('删除成功')
        this.loadAuthorities()
      })
    }

    loadDept () {
      if (!this.id) {
        this.dept = null
        return
      }
      getDept(this.id).then(data => {
        this.dept = data || null
      })
    }

    loadAuthorities () {
      if (!this.id) {
        this.authorities = []
        return
      }
      queryAuthorities({
        isUser: false,
        principleId: this.id
      }).then(data => {
        this.authorities = data || []
      })
    }

    @Watch('id', { immediate: true }) idChange () {
      this.loadDept()
      this.loadAuthorities()
    }
}
</script>
