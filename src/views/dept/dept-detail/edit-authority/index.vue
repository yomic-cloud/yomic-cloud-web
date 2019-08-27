<template>
    <div>
      <v-modal :visible.sync="actualVisible" width="60vw" :title="title">

        <div :class="[$style.body]">
          <div :class="[$style.bodyLeft]">
            <v-checkbox-group v-model="form.bits">
              <v-row :gutter="16">
                <v-col :span="8" v-for="(item, key) in UMASK" :key="key">
                  <v-checkbox :label="item.value">{{item.desc}}</v-checkbox>
                </v-col>
              </v-row>
            </v-checkbox-group>
          </div>
          <div>
            <file-selector></file-selector>
          </div>
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
import { addAuthority, patchAuthority } from '@/api/authority'
import { UMASK, toUmask, toArray } from '@/common/umask'
import FileSelector from './file-selector/index.vue'

@Component({
  components: { FileSelector }
})
export default class EditAuthority extends Vue {
  authority: any = null

  UMASK = UMASK

  form: any = {
    fileId: null,
    umask: 0,
    set bits (value: number[]) {
      this.umask = toUmask(value)
      debugger
    },
    get bits () {
      return toArray(this.umask)
    }
  }

  resolve: Function | null = null

  reject: Function | null = null

  visible: boolean = false

  get isEdit (): boolean {
    return !!this.authority
  }

  get actualVisible () {
    return this.visible
  }

  set actualVisible (visible: boolean) {
    this.onCancel()
  }

  get title () {
    return this.isEdit ? '编辑文件权限' : '新增文件权限'
  }

  add (): Promise<any> {
    this.authority = null
    return this.init()
  }

  edit (authority: any) {
    this.authority = authority || null
    return this.init()
  }

  init (): Promise<any> {
    let origin = {
      fileId: (this.authority && this.authority.fileId) || null,
      umask: (this.authority && this.authority.umask) || 0
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
    if (this.isEdit) return patchAuthority(this.authority.id, false, req)
    return addAuthority(req)
  }

  generateReq () {
    let req: any = {}
    let isUser = false
    Object.assign(req, this.form, { isUser })
    if (this.isEdit) {
      req.id = this.authority && this.authority.id
    }
    return req
  }
}
</script>

<style lang="scss" module>
.body {
  display: flex;
  height: calc(100vh - 320px);
}

.bodyLeft {
  width: 50%;
  flex: 0 0 auto;
}
</style>
