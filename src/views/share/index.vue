<template>
    <div>
        <div class="d-flex justify-content-between align-content-center m-2">
            <v-alert type="info" style="flex: 1 1 auto;">
                <template slot="description">
                    已选择 <span>{{checkedRows.length}}</span> 项
                    <a class="ml-2" @click="onClearSelection">清空选择</a>
                </template>
            </v-alert>
            <div class="ml-3">
                <v-button color="primary" icon="rollback" :disabled="checkedRows.length < 1" @click="onCancel()">取消分享</v-button>
            </div>
        </div>

        <v-table pageable row-key="id" :data-source="dataSource" @selection-change="onSelectionChange" height="calc(100vh - 300px)">
            <v-table-column type="selection" fixed="left" width="80px"></v-table-column>
            <v-table-column prop="name" label="分享文件">
              <template slot-scope="{row}">
                <file-icon v-bind="iconProps(row)"></file-icon>
                <span class="ml-2 text-link">{{resolveName(row)}}</span>
              </template>
            </v-table-column>
            <v-table-column prop="creationTime" label="分享时间"></v-table-column>
            <v-table-column prop="creationBy" label="分享人"></v-table-column>
            <v-table-column prop="expiryTime" label="失效时间"></v-table-column>
            <v-table-column prop="opt" label="操作" fixed="right" width="80px">
                <template slot-scope="{row}">
                    <span class="icon-btn" @click="onCancel(row.id)"><v-icon type="rollback"></v-icon></span>
                </template>
            </v-table-column>
        </v-table>
    </div>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator'
import { queryLinks } from '@/api/link'

@Component
export default class Share extends Vue {
    dataSource: any[] = []

    checkedRows: any = []

    onCancel (id?: number) {

    }

    onSelectionChange (rows: any[]) {
      this.checkedRows = rows || []
    }

    onClearSelection () {
      this.checkedRows = []
    }

    refresh () {
      this.loadData()
    }

    iconProps (row: any) {
      let dir = true
      let personal = false
      let root = false
      let contentType = ''
      return { dir, personal, root, contentType }
    }

    resolveName (row: any) {
      return (row.files && row.files[0] && row.files[0].name) + '...'
    }

    loadData () {
      queryLinks({}).then(data => {
        this.dataSource = data || []
      })
    }

    validate (id?: number) {
      if (!id && this.checkedRows.length < 1) {
        this.$message.info('请选择至少一条记录')
        return false
      }
      return true
    }

    mounted () {
      this.loadData()
    }
}
</script>

<style lang="scss" module>
.header {
}
</style>
