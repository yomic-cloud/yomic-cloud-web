<template>
    <div>
      <v-modal :visible.sync="actualVisible" width="30vw" :title="title">
        <v-form ref="form">
          <v-form-item label="父级部门" prop="parentId">
            <v-select clearable searchable v-model="form.parentId">
              <v-option :label="dept.name" :value="dept.id" v-for="dept in depts" :key="dept.id"></v-option>
            </v-select>
          </v-form-item>

          <v-form-item label="部门名称" prop="name">
            <v-input clearable v-model="form.name" maxlength="16"></v-input>
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
import { addDept, patchDept, queryDepts } from '@/api/dept'

@Component
export default class EditDept extends Vue {
  dept: any = null

  parent: any = null

  depts: any[] = []

  form = {
    parentId: null,
    name: ''
  }

  resolve: Function | null = null

  reject: Function | null = null

  visible: boolean = false

  get isEdit (): boolean {
    return !!this.dept
  }

  get actualVisible () {
    return this.visible
  }

  set actualVisible (visible: boolean) {
    this.onCancel()
  }

  get title () {
    return this.isEdit ? '编辑部门' : '新增部门'
  }

  add (parent: any): Promise<any> {
    this.parent = parent || null
    this.dept = null
    return this.init()
  }

  edit (dept: any, parent: any) {
    this.dept = dept || null
    this.parent = parent || null
    return this.init()
  }

  init (): Promise<any> {
    this.form = {
      parentId: (this.parent && this.parent.id) || null,
      name: (this.dept && this.dept.name) || ''
    }
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
    let req: any = this.generateReq()
    if (this.isEdit) return patchDept(this.dept.id, req)
    return addDept(req)
  }

  generateReq () {
    let req: any = {}
    let name = this.form.name
    let parentId = this.form.parentId
    Object.assign(req, { name, parentId })
    if (this.isEdit) {
      req.id = this.dept && this.dept.id
      if (!req.parrentId) req.parrentId = -1
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
