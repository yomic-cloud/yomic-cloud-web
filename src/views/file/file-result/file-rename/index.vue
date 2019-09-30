<template>
    <div>
      <v-modal :visible.sync="actualVisible" width="30vw" :title="title">
        <v-form ref="form" :model="form" :rules="rules" label-width="80px" label-position="left">
          <v-form-item label="名称" prop="name" required>
            <v-input clearable v-model.trim="form.name" maxlength="16"></v-input>
          </v-form-item>
        </v-form>

        <div slot="footer" class="text-right">
          <v-button @click="onCancel">取消</v-button>
          <v-button type="primary" class="ml-3" @click="onConfirm">确定</v-button>
        </div>
      </v-modal>
    </div>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator'
import { patchFile } from '@/api/file'

@Component
export default class FileRename extends Vue {
  file: any = null

  form = {
    name: ''
  }

  rules = {
    'name': [
      { validator: 'required', message: '名称必填' }
    ]
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

  get title () {
    return '重命名'
  }

  rename (file: any) {
    this.file = file || null
    return this.init()
  }

  init (): Promise<any> {
    this.form = {
      name: (this.file && this.file.name) || ''
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
    const $e = this.$refs.form as any
    $e.validate().then(({ valid, errors }: any) => {
      if (valid) {
        this.request().then(data => {
          this.visible = false
          if (this.resolve) this.resolve(data)
        })
      }
    })
  }

  request (): Promise<number | void> {
    let req: any = this.generateReq()
    return patchFile(this.file.id, req)
  }

  generateReq () {
    let req: any = { dir: true }
    Object.assign(req, this.form)
    return req
  }
}
</script>
