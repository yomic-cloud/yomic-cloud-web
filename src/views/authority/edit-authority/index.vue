<template>
    <div>
      <v-modal :visible.sync="actualVisible" width="60vw" :title="title">

        <div :class="[$style.body]" v-if="visible">
          <div :class="[$style.bodyLeft]">
            <v-checkbox v-model="allChecked">全部</v-checkbox>
            <v-checkbox v-model="noneChecked">禁用</v-checkbox>
            <v-checkbox-group v-model="form.bits">
              <v-row :gutter="16">
                <v-col :span="8" v-for="(item, key) in umasks" :key="key">
                  <v-checkbox :label="item.value">{{item.desc}}</v-checkbox>
                </v-col>
              </v-row>
            </v-checkbox-group>

            <div class="mt-4 d-flex align-items-center">
              <span class="mr-2">有效天数: </span>
              <v-select v-model="form.validDays" class="w-8">
                <v-option label="永久有效" :value="-1"></v-option>
                <v-option label="1天" :value="1"></v-option>
                <v-option label="3天" :value="3"></v-option>
                <v-option label="7天" :value="7"></v-option>
              </v-select>
            </div>
          </div>
          <div :class="[$style.bodyRight]" class="border-left pl-3">
            <file-selector :ids.sync="form.ids" :disabled="isEdit" ></file-selector>
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
import { UMASK, toUmask, toArray, allUmask } from '@/common/umask'
// import FileSelector from './file-selector/index.vue'

@Component({
  components: { }
})
export default class EditAuthority extends Vue {
  row: any = null

  get principleId () {
    return this.row && this.row.principleId
  }

  get isUser () {
    return this.row && this.row.isUser
  }

  umasks = UMASK

  form: any = {
    fileId: null,
    validDays: -1,
    umask: 0,
    set bits (value: number[]) {
      this.umask = toUmask(value)
    },
    get bits () {
      return toArray(this.umask)
    },
    set ids (ids) {
      this.fileId = ids[0] || null
    },
    get ids () {
      return this.fileId ? [this.fileId] : []
    }
  }

  resolve: Function | null = null

  reject: Function | null = null

  visible: boolean = false

  get allChecked () {
    return allUmask(this.form.umask)
  }

  set allChecked (value: boolean) {
    if (value) this.form.umask = -1
  }

  get noneChecked () {
    return this.form.umask === 0
  }

  set noneChecked (value: boolean) {
    if (value) this.form.umask = 0
  }

  get isEdit (): boolean {
    return !!(this.row && this.row.id)
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

  add (row: any): Promise<any> {
    this.row = row || null
    return this.init()
  }

  edit (row: any) {
    this.row = row || null
    return this.init()
  }

  init (): Promise<any> {
    let origin = {
      validDays: (this.row && this.row.validDays) || -1,
      fileId: (this.row && this.row.fileId) || null,
      umask: (this.row && this.row.umask) || 0
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
    const vm = this
    let req: any = this.generateReq()
    if (!validate()) return Promise.reject(new Error('validate fail'))
    if (this.isEdit) return patchAuthority(this.row.id, this.isUser, req)
    return addAuthority(req)

    function validate (): boolean {
      if (!req.fileId && !vm.isEdit) {
        vm.$message.warning('请选择文件/文件夹')
        return false
      }
      return true
    }
  }

  generateReq () {
    let req: any = {}
    let { isUser, principleId } = this
    Object.assign(req, this.form)
    if (this.isEdit) {
      req.id = this.row && this.row.id
    } else {
      Object.assign(req, { isUser, principleId })
    }
    return req
  }
}
</script>

<style lang="scss" module>
.body {
  display: flex;
  height: calc(100vh - 320px);
  overflow: auto;
}

.bodyLeft {
  width: 50%;
  flex: 0 0 auto;
}

.bodyRight {
  width: 50%;
  flex: 0 0 auto;
}
</style>
