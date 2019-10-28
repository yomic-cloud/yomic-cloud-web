<template>
    <div>
        <div :class="[$style.header]" class="text-right m-2">
            <v-button color="primary" type="text" icon="delete" @click="onClear">清空回收站</v-button>
        </div>

        <div class="d-flex justify-content-between align-content-center m-2">
            <v-alert type="info" style="flex: 1 1 auto;">
                <template slot="description">
                    已选择 <span>{{checkedRows.length}}</span> 项
                    <a class="ml-2" @click="onClearSelection">清空选择</a>
                </template>
            </v-alert>
            <div class="ml-3">
                <v-button color="primary" icon="delete" :disabled="checkedRows.length < 1" @click="onDelete()">删除</v-button>
                <v-button color="primary" icon="reload" :disabled="checkedRows.length < 1" class="ml-2" @click="onRecover()">恢复</v-button>
            </div>
        </div>

        <v-table pageable row-key="id" :data-source="dataSource" @selection-change="onSelectionChange" height="calc(100vh - 300px)">
            <v-table-column type="selection" fixed="left" width="80px"></v-table-column>
            <v-table-column prop="path" label="文件名"></v-table-column>
            <v-table-column prop="size" label="大小"></v-table-column>
            <v-table-column prop="creationTime" label="删除时间"></v-table-column>
            <v-table-column prop="creationBy" label="删除人"></v-table-column>
            <v-table-column prop="opt" label="操作" fixed="right" width="80px">
                <template slot-scope="{row}">
                    <span class="icon-btn" @click="onDelete(row.id)"><v-icon type="delete"></v-icon></span>
                    <span class="ml-3 icon-btn" @click="onRecover(row.id)"><v-icon type="reload"></v-icon></span>
                </template>
            </v-table-column>
        </v-table>
    </div>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator'
import { queryRecycles, deleteRecycles, recoverRecycles } from '@/api/recycle'

@Component
export default class Recycle extends Vue {
    dataSource: any[] = []

    checkedRows: any = []

    onDelete (id?: number) {
      if (!this.validate(id)) return
      this.$modal.confirm({ title: '确认', content: '确认删除文件，删除后将不能恢复？' }).then(() => {
        let ids: number[] = id ? [id] : this.checkedRows
        deleteRecycles(ids).then(() => {
          this.refresh()
        })
      })
    }

    onRecover (id?: number) {
      if (!this.validate(id)) return
      this.$modal.confirm({ title: '确认', content: '确认恢复文件？' }).then(() => {
        let ids: number[] = id ? [id] : this.checkedRows
        recoverRecycles(ids).then(() => {
          this.refresh()
        })
      })
    }

    onSelectionChange (rows: any[]) {
      this.checkedRows = rows || []
    }

    onClearSelection () {
      this.checkedRows = []
    }

    onClear () {
      this.$message.warning('暂未实现')
    }

    refresh () {
      this.loadData()
    }

    loadData () {
      queryRecycles({}).then(data => {
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
