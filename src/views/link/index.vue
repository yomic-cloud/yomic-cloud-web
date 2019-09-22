<template>
  <div class="bg-2 p-3">
    <div class="bg-base p-3 border-rounded" v-if="link">
      <div class="d-flex justify-content-between">
        <span>
          <file-icon v-bind="linkIconProps"></file-icon>
          <span class="ml-2 text-link">{{linkName}}</span>
        </span>
        <span>
          <v-button type="outline" color="primary" icon="close-circle-o">取消分享</v-button>
          <v-button type="outline" color="primary" icon="cloud-download-o" class="ml-2">下载</v-button>
        </span>
      </div>

      <div class="caption">
        <span><span><v-icon type="clock-circle-o"></v-icon></span> <span class="ml-2">2019/09/07 12:34:45</span></span>
        <span class="ml-3">失效时间：6小时</span>
      </div>
    </div>

    <div class="bg-base p-3 mt-3 border-rounded">
      <div class="d-flex justify-content-between align-content-center m-2">
          <file-navigator :id="parentId" :link-id="link.id" v-if="link"></file-navigator>
          <v-alert type="info" style="flex: 0 0 auto;" class="ml-5 w-14">
              <template slot="description">
                  已选择 <span>{{checkedRows.length}}</span> 项
                  <a class="ml-2" @click="onClearSelection">清空选择</a>
              </template>
          </v-alert>
      </div>

      <file-list :data-source="dataSource" :checked-rows.sync="checkedRows"></file-list>
    </div>
  </div>
</template>

<script lang="ts">

import { Vue, Component, Provide, Watch } from 'vue-property-decorator'
import { getLinkByCode, queryFilesByLink, downloadFileByLink } from '@/api/link'
import { download } from '@/helpers/download'
import FileList from './file-list/index.vue'
import FileNavigator from './file-navigator/index.vue'

@Component({
  components: {
    FileList, FileNavigator
  }
})
export default class Link extends Vue {
  link: any = null

  checkedRows: any = []

  dataSource: any[] = []

  loading: boolean = false

  get code () {
    return this.$route.params.code
  }

  get parentId () {
    let parentId = this.$route.query.fileId
    return parentId ? +parentId : null
  }

  get linkIconProps () {
    let dir = true
    let personal = false
    let root = false
    let contentType = ''
    return { dir, personal, root, contentType }
  }

  get linkName () {
    if (!this.link) return ''
    return (this.link.files && this.link.files[0] && this.link.files[0].name) + '...'
  }

  onClearSelection () {
    this.checkedRows = []
  }

  @Provide() onPreview (row: any) {
    let path = this.$route.path
    if (row.dir) {
      this.$router.push({ path: path, query: { fileId: row.id } })
    }
  }

  @Provide() onDownload (file?: any) {
    if (!file) {
      this.$message.info('暂不支持批量下载')
      return
    }
    if (file.dir) {
      this.$message.info('暂不支持下载文件夹')
      return
    }
    downloadFileByLink(this.link.id, file.id).then(data => {
      download(data, file.name)
    })
  }

  loadLink () {
    if (!this.code) {
      this.link = null
      return
    }
    getLinkByCode(this.code).then(data => {
      this.link = data || null
      this.loadData()
    })
  }

  loadData () {
    if (!this.link) {
      this.dataSource = []
      return
    }
    this.loading = true
    queryFilesByLink(this.link.id, this.parentId as any).then(data => {
      this.dataSource = data || []
    }).finally(() => {
      this.loading = false
    })
  }

  mounted () {
    this.loadLink()
  }

  @Watch('parentId') parentIdChange () {
    this.loadData()
  }
}
</script>

<style lang="scss" module>
.header {
}
</style>
