<template>
    <div class="p-3">
        <v-card title="基本信息" class="mb-4">
            <span>
                <span>部门名称: <span>IT部门</span></span>
            </span>
        </v-card>

        <v-card title="文件权限列表">
            <v-table :data-source="dataSource">
                <v-table-column prop="fileId" label="文件/文件夹"></v-table-column>
                <v-table-column prop="umask" label="权限"></v-table-column>
                <v-table-column prop="opt" label="操作" fixed="right" width="120px">
                    <template slot-scope="{row}">
                        <span class="icon-btn"><v-icon type="edit"></v-icon></span>
                        <span class="ml-3 icon-btn"><v-icon type="delete"></v-icon></span>
                    </template>
                </v-table-column>
            </v-table>
        </v-card>
    </div>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator'

@Component
export default class DeptDetail extends Vue {
    dataSource: any[] = [{
      name: 'IT'
    }]
}
</script>
