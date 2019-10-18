<template>
    <div>
        <div>
            <v-form layout="horizontal" class="mx-3 mt-3" :model="form" ref="form">
                <v-form-item prop="username" label="用户名">
                    <v-input v-model.trim="form.username" clearable class="w-10"></v-input>
                </v-form-item>
                <v-form-item prop="cname" label="中文名">
                    <v-input v-model.trim="form.cname" clearable class="w-10"></v-input>
                </v-form-item>
                <v-form-item prop="deptId" label="归属部门">
                  <v-select clearable searchable v-model="form.deptId" class="w-10">
                    <v-option label="无" :value="-1"></v-option>
                    <v-option :label="dept.name" :value="dept.id" v-for="dept in depts" :key="dept.id"></v-option>
                </v-select>
                </v-form-item>
                <v-form-item prop="status" label="状态">
                    <v-select v-model="form.status" clearable class="w-8">
                        <v-option label="有效" :value="true"></v-option>
                        <v-option label="无效" :value="false"></v-option>
                    </v-select>
                </v-form-item>

                <v-form-item >
                   <v-button type="primary" @click="onQuery">查询</v-button>
                   <v-button class="ml-3" @click="onReset">重置</v-button>
                </v-form-item>
            </v-form>
        </div>

        <div>
          <div class="mb-2 text-right">
            <v-button type="text" size="sm" color="primary" @click="onAdd">新增用户</v-button>
          </div>
          <v-table pageable :data-source="dataSource" height="calc(100vh - 330px)">
                <v-table-column prop="username" label="用户名"></v-table-column>
                <v-table-column prop="cname" label="姓名"></v-table-column>
                <v-table-column prop="deptName" label="所属部门"></v-table-column>
                <v-table-column prop="ip" label="ip"></v-table-column>
                <v-table-column prop="status" label="状态">
                  <template slot-scope="{row}">{{row.status | transcode('status')}}</template>
                </v-table-column>
                <v-table-column prop="opt" label="操作" fixed="right" width="160px">
                    <template slot-scope="{row}">
                        <span class="icon-btn" @click="onEdit(row)" title="编辑"><v-icon type="edit"></v-icon></span>
                        <span class="ml-3 icon-btn" @click="onDelete(row.id)" title="删除"><v-icon type="delete"></v-icon></span>
                        <span class="ml-3 icon-btn" @click="onViewAuthority(row.id)" title="查看权限"><v-icon type="safety"></v-icon></span>
                        <span class="ml-3 icon-btn" :disabled="!hasAdminRole(row)" @click="onViewUserFile(row)" title="管理员目录"><v-icon type="folder-add"></v-icon></span>
                    </template>
                </v-table-column>
            </v-table>
        </div>
        <user-authority :visible.sync="authorityVisible" v-bind="authorityProps"></user-authority>
        <edit-user ref="editUser"></edit-user>
        <user-file ref="userFile"></user-file>
    </div>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator'
import { queryUsers, deleteUser } from '@/api/user'
import { queryDepts } from '@/api/dept'
import UserAuthority from './user-authority/index.vue'
import EditUser from './edit-user/index.vue'
import UserFile from './user-file/index.vue'
import { clone } from '@/helpers/lang'

@Component({
  components: { UserAuthority, EditUser, UserFile }
})
export default class User extends Vue {
    form = {
      username: '',
      cname: '',
      deptId: null,
      status: null
    }

    loading: boolean = false

    dataSource: any[] = []

    authorityProps = {
      principleId: null
    }

    authorityVisible: boolean = false

    depts: any[] = []

    onQuery () {
      this.query()
    }

    onReset () {
      const $form = this.$refs.form as any
      $form.resetFields()
    }

    onAdd () {
      const $e = this.$refs.editUser as EditUser
      $e.add().then(() => {
        this.$message.success('添加用户成功')
        this.query()
      })
    }

    onEdit (row: any) {
      const $e = this.$refs.editUser as EditUser
      $e.edit(row).then(() => {
        this.$message.success('编辑用户成功')
        this.query()
      })
    }

    onDelete (id: any) {
      deleteUser(id).then(() => {
        this.$message.success('删除用户成功')
        this.query()
      })
    }

    onViewAuthority (id: any) {
      this.authorityVisible = true
      this.authorityProps.principleId = id
    }

    onViewUserFile (row: any) {
      const $e = this.$refs.userFile as UserFile
      $e.view(row).then(() => {
        this.$message.success('修改管理员目录成功')
        this.query()
      })
    }

    hasAdminRole (row: any) {
      return (row.roles || []).includes('ADMIN')
    }

    query () {
      this.loading = true
      queryUsers(clone(this.form, true)).then(data => {
        this.dataSource = data || []
      }).finally(() => {
        this.loading = false
      })
    }

    loadDepts () {
      queryDepts({}).then(data => {
        this.depts = data || []
      })
    }

    mounted () {
      this.query()
      this.loadDepts()
    }
}
</script>
