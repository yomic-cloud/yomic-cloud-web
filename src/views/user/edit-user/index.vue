<template>
    <div>
      <v-modal :visible.sync="actualVisible" width="480px" :title="title">
        <v-form ref="form" :rules="rules" :model="form" label-width="80px" label-position="left" class="ml-3" v-if="visible">
          <v-form-item label="用户名" prop="username" required>
            <v-input clearable v-model="form.username" maxlength="16" :disabled="isEdit"></v-input>
          </v-form-item>

          <v-form-item label="密码" prop="password" required v-if="!isEdit">
            <div class="d-flex align-items-center">
              <v-input clearable v-model="form.password" maxlength="16" :disabled="isEdit"></v-input>
              <v-button type="outline" color="info" class="ml-2" @click="onGenPassword">随机生成</v-button>
            </div>
          </v-form-item>

          <v-form-item label="归属部门" prop="deptId">
            <v-select clearable searchable v-model="form.deptId">
              <v-option :label="dept.name" :value="dept.id" v-for="dept in depts" :key="dept.id"></v-option>
            </v-select>
          </v-form-item>

          <v-form-item label="中文名" prop="cname" required>
            <v-input clearable v-model="form.cname" maxlength="16"></v-input>
          </v-form-item>

          <v-form-item label="角色" prop="role" required>
            <v-radio-group v-model="form.role">
              <v-radio label="SUPER">超级管理员</v-radio>
              <v-radio label="ADMIN">文件夹管理员</v-radio>
              <v-radio label="USER">普通用户</v-radio>
            </v-radio-group>
          </v-form-item>

          <v-form-item label="ip" prop="ip">
            <span slot="label">
              <span>IP: </span>
              <v-tooltip content="例如：10.192.168.1-10,10.192.168.20"><v-icon type="question-circle"></v-icon></v-tooltip>
            </span>
            <v-input clearable v-model="form.ip" maxlength="64"></v-input>
          </v-form-item>

          <v-form-item label="状态" prop="status">
            <v-radio-group v-model="form.status">
              <v-radio :label="true">有效</v-radio>
              <v-radio :label="false">无效</v-radio>
            </v-radio-group>
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
import { queryDepts } from '@/api/dept'
import { addUser, patchUser } from '@/api/user'
import { randomString } from '@/helpers/lang'

@Component
export default class EditUser extends Vue {
  user: any = null

  depts: any[] = []

  form = {
    username: '',
    password: '',
    cname: '',
    deptId: null,
    role: 'USER',
    ip: '',
    status: true,
    get roles () {
      return this.role ? [this.role] : []
    }
  }

  rules = {
    username: [
      { validator: 'required', message: '用户名必填', trigger: 'blur' }
    ],
    password: [
      { validator: 'required', message: '密码必填', trigger: 'blur' }
    ],
    cname: [
      { validator: 'required', message: '中文名必填', trigger: 'blur' }
    ]
  }

  resolve: Function | null = null

  reject: Function | null = null

  visible: boolean = false

  get isEdit (): boolean {
    return !!this.user
  }

  get actualVisible () {
    return this.visible
  }

  set actualVisible (visible: boolean) {
    this.onCancel()
  }

  get title () {
    return this.isEdit ? '编辑用户' : '新增用户'
  }

  onGenPassword () {
    this.form.password = randomString()
  }

  add (): Promise<any> {
    this.user = null
    return this.init()
  }

  edit (user: any) {
    this.user = user || null
    return this.init()
  }

  init (): Promise<any> {
    const origin = {
      username: (this.user && this.user.username) || '',
      password: '',
      cname: (this.user && this.user.cname) || '',
      deptId: (this.user && this.user.deptId) || null,
      role: (this.user && this.user.roles && this.user.roles[0]) || 'USER',
      ip: (this.user && this.user.ip) || '',
      status: (this.user && this.user.status) || true
    }
    Object.assign(this.form, origin)
    this.visible = true
    this.loadDepts()
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
    const $form = this.$refs.form as any
    return $form.validate().then(({ valid }: any) => {
      if (valid) {
        let req: any = this.generateReq()
        if (this.isEdit) return patchUser(this.user.id, req)
        return addUser(req)
      }
      return Promise.reject(new Error('valid fail'))
    })
  }

  generateReq () {
    let req: any = {}
    Object.assign(req, this.form)
    if (this.isEdit) {
      req.id = this.user && this.user.id
      if (!req.deptId) req.deptId = -1
    }
    return req
  }

  loadDepts () {
    queryDepts({}).then(data => {
      this.depts = data || []
    })
  }
}
</script>
