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
            <v-table :data-source="authorities">
                <v-table-column prop="fileId" label="文件/文件夹"></v-table-column>
                <v-table-column prop="umask" label="权限"></v-table-column>
                <v-table-column prop="opt" label="操作" fixed="right" width="120px">
                    <template slot-scope="">
                        <span class="icon-btn"><v-icon type="edit"></v-icon></span>
                        <span class="ml-3 icon-btn"><v-icon type="delete"></v-icon></span>
                    </template>
                </v-table-column>
            </v-table>
        </v-card>
    </div>
</template>

<script lang="ts">

import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { getDept } from '@/api/dept'
import { queryAuthorities } from '@/api/authority'

@Component
export default class DeptDetail extends Vue {
    @Prop(Number) id!: number

    dept: any = null

    authorities: any[] = [{
      name: 'IT'
    }]

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
        isUser: true,
        principleId: this.id
      }).then(data => {
        this.authorities = data || []
      })
    }

    @Watch('id', { immediate: true }) idChange () {
      this.loadDept()
    }
}
</script>
