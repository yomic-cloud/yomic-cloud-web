<template>
  <div class="bg-2 p-3">
    <div class="p-3 m-auto w-20" v-if="hasPassword && !validated">
      <div class="text-primary py-2">{{link && link.creationBy}} 向你分享了文件: </div>
      <div class="d-flex">
        <v-input placeholder="请输入提取码" v-model.trim="password"></v-input>
        <v-button type="primary" class="ml-3" @click="onExtract">提取文件</v-button>
      </div>
    </div>
    <div v-else>
      <div class="bg-base p-3 border-rounded">
        <div class="d-flex justify-content-between">
          <span>
            <file-icon v-bind="linkIconProps"></file-icon>
            <span class="ml-2 text-link">{{link && link.fileName}}</span>
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
            <file-navigator :id="parentId" :link-id="link.id" :password="password" v-if="link"></file-navigator>
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
  </div>
</template>

<script lang="ts">

import { Vue, Component, Provide, Watch } from 'vue-property-decorator'
import { getLink, queryFiles, download as downloadFile } from '@/api/share'
import { download } from '@/helpers/download'
import FileList from './file-list/index.vue'
import FileNavigator from './file-navigator/index.vue'

@Component({
  components: {
    FileList, FileNavigator
  }
})
export default class Share extends Vue {
  link: any = null

  checkedRows: any = []

  dataSource: any[] = []

  loading: boolean = false

  password: string = ''

  validated: boolean = false

  get id () {
    return +this.$route.params.id
  }

  get hasPassword () {
    return !!(this.link && this.link.password)
  }

  get parentId () {
    let parentId = this.$route.query.fileId
    return parentId ? +parentId : null
  }

  get linkIconProps () {
    let multiple = this.link && this.link.multiple
    let dir = multiple ? false : (this.link && this.link.dir)
    let personal = false
    let root = false
    let contentType = multiple ? 'multiple-share' : (this.link && this.link.contentType)
    return { dir, personal, root, contentType }
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
    downloadFile(this.link.id, this.password, file.id).then(data => {
      download(data, file.name)
    })
  }

  loadLink () {
    if (!this.id) {
      this.link = null
      return
    }
    getLink(this.id).then(data => {
      this.link = data || null
      if (!this.hasPassword) {
        this.loadData()
      }
    })
  }

  loadData () {
    if (!this.link) {
      this.dataSource = []
      return
    }
    this.loading = true
    queryFiles(this.link.id, this.password, this.parentId as any).then(data => {
      this.validated = true
      this.dataSource = data || []
    }).finally(() => {
      this.loading = false
    })
  }

  mounted () {
    this.loadLink()
  }

  onExtract () {
    this.loadData()
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
