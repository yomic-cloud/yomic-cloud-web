<template>
    <div>
        <div :class="[$style.toolbar]" class="m-2">
            <span class="d-flex">
                <v-button color="primary" class="mr-2" icon="upload" @click="onUpload">上传</v-button>
                <v-button color="primary" class="mr-2" @click="onNew">新建文件夹</v-button>

                <v-button-group class="mr-2">
                    <v-button color="primary">分享</v-button>
                    <v-button color="primary">下载</v-button>
                    <v-button color="primary">删除</v-button>
                    <v-button color="primary">重命名</v-button>
                    <v-button color="primary" disabled>复制到</v-button>
                    <v-button color="primary" disabled>移动到</v-button>
                </v-button-group>
            </span>

            <span class="mr-2 ft-24 d-flex">
                <span v-if="view === 'list'" class="icon-btn" @click="onSelectView('thumbnail')"><v-icon type="appstore"></v-icon></span>
                <span v-if="view === 'thumbnail'" class="icon-btn" @click="onSelectView('list')"><v-icon type="bars"></v-icon></span>
            </span>
        </div>

        <div class="d-flex justify-content-between align-content-center m-2">
            <file-navigator :id="parentId"></file-navigator>
            <v-alert type="info" style="flex: 0 0 auto;" class="ml-5 w-14">
                <template slot="description">
                    已选择 <span>{{checkedRows.length}}</span> 项
                    <a class="ml-2" @click="onClearSelection">清空选择</a>
                </template>
            </v-alert>
        </div>

        <div>
            <file-list :data-source="dataSource" :checked-rows.sync="checkedRows" v-if="view === 'list'"></file-list>
            <file-thumbnail :data-source="dataSource" :checked-rows.sync="checkedRows" v-else></file-thumbnail>
        </div>

        <edit-dir ref="editDir"></edit-dir>
        <file-upload ref="fileUpload"></file-upload>
    </div>
</template>

<script lang="ts">

import { Vue, Component, Prop, Watch, Provide } from 'vue-property-decorator'
import { queryFiles, downloadFile } from '@/api/file'
import { download } from '@/helpers/download'
import FileList from './file-list/index.vue'
import FileThumbnail from './file-thumbnail/index.vue'
import FileNavigator from './file-navigator/index.vue'
import EditDir from './edit-dir/index.vue'
import FileUpload from './file-upload/index.vue'

@Component({
  components: { FileList, FileThumbnail, FileNavigator, EditDir, FileUpload }
})
export default class FileResult extends Vue {
    @Prop(Number) parentId!: number

    view: 'list' | 'thumbnail' = 'list'

    checkedRows: any = []

    dataSource: any[] = []

    loading: boolean = false

    onSelectView (view: 'list' | 'thumbnail') {
      this.view = view
    }

    onClearSelection () {
      this.checkedRows = []
    }

    @Provide() onPreview (row: any) {
      if (row.dir) {
        this.$router.push({ path: '/file', query: { id: row.id } })
      }
    }

    onUpload () {
      const $e = this.$refs.fileUpload as FileUpload
      $e.upload(this.parentId).then(() => {
        this.$message.success('上传成功')
        this.refresh()
      })
    }

    onNew () {
      const $e = this.$refs.editDir as EditDir
      $e.add(this.parentId).then(() => {
        this.$message.success('新建文件夹成功')
        this.refresh()
      })
    }

    onShare (file?: any) {

    }

    @Provide() onDownload (file?: any) {
      if (file.dir) {
        this.$message.info('暂不支持下载文件夹')
        return
      }
      downloadFile(file.id).then(data => {
        download(data, file.name)
      })
    }

    onDelete (file?: any) {

    }

    onRename (file?: any) {

    }

    onCopyTo (file?: any) {

    }

    onMoveTo (file?: any) {

    }

    refresh () {
      this.loadData()
      this.onClearSelection()
    }

    loadData () {
      if (!this.parentId) {
        this.dataSource = []
        return
      }
      let parentId = this.parentId
      let personal = false
      let status = true
      if (parentId < 0) {
        if (parentId === -3) personal = true
        parentId = -1
      }
      let req = { parentId, personal, status }
      this.loading = true
      queryFiles(req).then(data => {
        this.dataSource = data || []
      }).finally(() => {
        this.loading = false
      })
    }

    @Watch('parentId', { immediate: true }) parentIdChange (parentId: number) {
      this.refresh()
    }
}
</script>

<style lang="scss" module>
.toolbar {
    display: flex;
    justify-content: space-between;
}
</style>
