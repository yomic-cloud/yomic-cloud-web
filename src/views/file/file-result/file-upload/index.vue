<template>
    <div>
      <v-modal :visible.sync="actualVisible" width="40vw" title="上载文件">
        <div :class="[$style.body]">
          <v-upload :custom-request="customRequest" :before-upload="beforeUpload" :success-fn="successFn" :remove-fn="removeFn" v-if="visible">
            <div class="border rounded border-dashed w-16 h-12 text-center p-4">
              <div class="text-primary ft-64"><v-icon type="upload"></v-icon></div>
              <div class="display-5">点击或拖动文件到此处</div>
              <p class="caption">只支持单文件上载</p>
            </div>
          </v-upload>
        </div>
        <div slot="footer" class="text-right">
          <v-button @click="onCancel">取消</v-button>
          <v-button type="primary" class="ml-3" @click="onConfirm">确定</v-button>
        </div>
      </v-modal>
    </div>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator'
import request from './request'
import { remove } from '@/api/nas'
import { addFile } from '@/api/file'
import { UploadFile } from 'vua'

@Component
export default class FileUpload extends Vue {
  parentId: number | null = null

  form = {
    uuid: '',
    name: ''
  }

  resolve: Function | null = null

  reject: Function | null = null

  visible: boolean = false

  customRequest = request

  get actualVisible () {
    return this.visible
  }

  set actualVisible (visible: boolean) {
    this.onCancel()
  }

  beforeUpload (file: UploadFile, fileList: UploadFile[]): boolean {
    if (fileList.length < 2) {
      this.form.uuid = ''
      this.form.name = file.name
      return true
    }
    this.$message.info('请先移除存在文件')
    fileList.pop()
    return false
  }

  successFn (data: any) {
    this.form.uuid = data
  }

  removeFn () {
    return this.removeFile()
  }

  upload (parentId: number | null) {
    this.parentId = parentId
    return this.init()
  }

  init (): Promise<any> {
    this.form = {
      uuid: '',
      name: ''
    }
    this.visible = true
    return new Promise((resolve, reject) => {
      this.resolve = resolve
      this.reject = reject
    })
  }

  onCancel () {
    this.removeFile()
    this.visible = false
    if (this.reject) this.reject()
  }

  onConfirm () {
    if (!this.form.uuid) {
      this.$message.info('请先上传文件')
      return
    }
    this.request(this.generateReq()).then(data => {
      this.visible = false
      if (this.resolve) this.resolve(data)
    })
  }

  request (req: any): Promise<number | void> {
    return addFile(req)
  }

  generateReq () {
    let req: any = {
      dir: false,
      uuid: this.form.uuid,
      name: this.form.name
    }
    if (this.parentId && this.parentId < 0) req.personal = this.parentId === -3
    req.parentId = (this.parentId && this.parentId < 0) ? null : this.parentId
    return req
  }

  removeFile (): Promise<any> {
    if (this.form.uuid) {
      return remove(this.form.uuid)
    }
    return Promise.resolve()
  }
}
</script>

<style lang="scss" module>
.body {
  height: 320px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
