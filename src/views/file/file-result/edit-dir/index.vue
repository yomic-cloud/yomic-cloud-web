<template>
    <div>
      <v-modal :visible.sync="actualVisible" width="30vw" :title="title">
        <v-form ref="form" :model="form" :rules="rules" label-width="80px" label-position="left">
          <v-form-item label="名称" prop="name" required>
            <v-input clearable v-model.trim="form.name" maxlength="16"></v-input>
          </v-form-item>
          <v-form-item label="容量" prop="limitSize">
            <v-input-number v-model="form.limitSize" maxlength="16" :min="0"></v-input-number>
          </v-form-item>
          <v-form-item label="文件类型" prop="limitSuffix">
            <div class="d-flex align-items-center">
                <v-input clearable v-model.trim="form.limitSuffix" maxlength="16"></v-input>
                <v-popover>
                    <span class="ml-2 icon-btn text-info" slot="reference"><v-icon type="question-circle"></v-icon></span>
                    <span>多个后缀使用英文标点,隔开</span>
                </v-popover>
            </div>
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
import { addFile, patchFile } from '@/api/file'

@Component
export default class EditDir extends Vue {
  file: any = null

  parentId?: number | null = null

  form = {
    name: '',
    limitSize: null,
    limitSuffix: ''
  }

  rules = {
    'name': [
      { validator: 'required', message: '名称必填' }
    ]
  }

  resolve: Function | null = null

  reject: Function | null = null

  visible: boolean = false

  get isEdit (): boolean {
    return !!this.file
  }

  get actualVisible () {
    return this.visible
  }

  set actualVisible (visible: boolean) {
    this.onCancel()
  }

  get title () {
    return this.isEdit ? '编辑文件夹' : '新建文件夹'
  }

  add (parentId: number | null): Promise<any> {
    this.parentId = parentId
    this.file = null
    return this.init()
  }

  edit (file: any) {
    this.file = file || null
    this.parentId = null
    return this.init()
  }

  init (): Promise<any> {
    this.form = {
      name: (this.file && this.file.name) || '',
      limitSize: (this.file && this.file.limitSize) || null,
      limitSuffix: (this.file && this.file.limitSuffix) || ''
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
    if (this.isEdit) return patchFile(this.file.id, req)
    return addFile(req)
  }

  generateReq () {
    let req: any = { dir: true }
    Object.assign(req, this.form)
    if (this.isEdit) {
      req.parentId = this.file.parentId
    } else {
      let parentId: any = this.parentId
      if (parentId < 0) req.personal = parentId === -3
      parentId = parentId < 0 ? null : parentId
      req.parentId = parentId
    }
    return req
  }
}
</script>
