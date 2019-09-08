<template>
    <div>
      <v-modal :visible.sync="actualVisible" width="40vw" title="上载文件">
        <div :class="[$style.body]">
          <v-upload>
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
import { addDept, patchDept, queryDepts } from '@/api/dept'

@Component
export default class FileUpload extends Vue {
  parentId: number | null = null

  form = {
  }

  resolve: Function | null = null

  reject: Function | null = null

  visible: boolean = false

  get actualVisible () {
    return this.visible
  }

  set actualVisible (visible: boolean) {
    this.onCancel()
  }

  upload (parentId: number | null) {
    this.parentId = parentId
    return this.init()
  }

  init (): Promise<any> {
    this.form = {
    }
    this.visible = true
    return new Promise((resolve, reject) => {
      this.resolve = resolve
      this.reject = reject
    })
  }

  onCancel () {
    this.visible = false
    if (this.reject) this.reject()
  }

  onConfirm () {
    this.request().then(data => {
      this.visible = false
      if (this.resolve) this.resolve(data)
    })
  }

  request (): Promise<number | void> {
    return Promise.resolve()
  }

  generateReq () {
    let req: any = {}
    return req
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
