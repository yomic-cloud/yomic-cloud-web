<template>
    <div>
      <v-modal :visible.sync="actualVisible" width="45vw" :title="title">
        <v-form ref="form" :model="form" label-width="80px" label-position="left" v-if="!link">
          <v-form-item label="提取码" prop="encode">
            <v-radio-group v-model="form.encode">
              <v-radio :label="true">有</v-radio>
              <v-radio :label="false">无</v-radio>
            </v-radio-group>
          </v-form-item>
          <v-form-item label="有效天数" prop="validDays">
            <v-input-number v-model="form.validDays" maxlength="4" :min="0"></v-input-number>
          </v-form-item>
        </v-form>
        <div v-else>
          <div> <span class="text-success"><v-icon type="check-circle"></v-icon></span> <span class="ml-2">成功分享链接</span></div>

          <div class="mt-3">
            <div class="d-flex">
              <v-input readonly append="链接7天后失效" :value="linkUrl" style="flex: 1 1 auto;"></v-input>
              <v-button type="primary" @click="onCopy" class="ml-2">复制链接</v-button>
            </div>
            <div class="mt-2">
              <v-input readonly append="提取码" :value="link.password" class="w-10"></v-input>
            </div>
          </div>
        </div>

        <div slot="footer" class="text-right">
          <v-button @click="onCancel">取消</v-button>
          <v-button type="primary" class="ml-3" @click="onCreate" v-if="!link">创建链接</v-button>
          <v-button type="primary" class="ml-3" @click="onConfirm" v-else>确定</v-button>
        </div>
      </v-modal>
    </div>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator'
import { addLink, getLink } from '@/api/link'
import { formatDate, addDays } from '@/helpers/date'
import { copy } from '@/helpers/copy'

@Component
export default class FileShare extends Vue {
  files: any[] = []

  form = {
    validDays: null,
    encode: true
  }

  link: any = null

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
    let name = ''
    if (this.files.length > 1) {
      name = this.files[0].name + '...'
    } else {
      name = (this.files[0] && this.files[0].name) || ''
    }
    return '分享文件: ' + name
  }

  get linkUrl () {
    if (!this.link) return ''
    return window.location.origin + `/#/links/${this.link.code}`
  }

  share (files: any[]) {
    this.files = files
    return this.init()
  }

  init (): Promise<any> {
    this.form = {
      validDays: null,
      encode: true
    }
    this.link = null
    this.visible = true
    return new Promise((resolve, reject) => {
      this.resolve = resolve
      this.reject = reject
    })
  }

  onCopy () {
    let url = this.linkUrl
    copy(url)
    this.$message.success('已复制到剪切板')
  }

  onCancel () {
    this.visible = false
    if (this.reject) this.reject()
  }

  onCreate () {
    const $e = this.$refs.form as any
    this.request().then(data => {
      if (data) {
        getLink(data).then(link => {
          this.link = link || null
        })
      }
    })
  }

  onConfirm () {
    this.visible = false
    if (this.resolve) this.resolve()
  }

  request (): Promise<number | void> {
    let req: any = this.generateReq()
    return addLink(req)
  }

  generateReq () {
    let req: any = {}
    req.files = this.files.map(v => v.id)
    req.encode = this.form.encode
    if (this.form.validDays) {
      req.expiredTime = formatDate(addDays(this.form.validDays as any))
    }
    Object.assign(req, this.form)
    return req
  }
}
</script>
