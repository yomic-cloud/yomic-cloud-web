<template>
    <div>
      <v-modal :visible.sync="actualVisible" width="640px" :title="title">
        <div>
          <file-selector></file-selector>
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
import { queryDepts } from '@/api/dept'
import { addUser, patchUser } from '@/api/user'
import { randomString } from '@/helpers/lang'

@Component
export default class UserFile extends Vue {
  row: any = null

  form = {
    files: []
  }

  rules = {
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
    return '编辑管理员目录'
  }

  view (row: any) {
    this.row = row || null
    return this.init()
  }

  init (): Promise<any> {
    const origin = {
      files: (this.row && this.row.files) || []
    }
    Object.assign(this.form, origin)
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
    let req: any = this.generateReq()
    return patchUser(this.row.id, req)
  }

  generateReq () {
    let req: any = {}
    Object.assign(req, this.form)
    return req
  }
}
</script>
