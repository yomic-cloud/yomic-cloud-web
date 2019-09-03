<template>
    <div>
        <div>
            <v-form layout="horizontal" class="m-3">
                <v-form-item prop="username" label="用户名">
                    <v-input v-model.trim="form.username" clearbale></v-input>
                </v-form-item>
                <v-form-item prop="cname" label="中文名">
                    <v-input v-model.trim="form.cname" clearbale></v-input>
                </v-form-item>
                <v-form-item prop="deptId" label="归属部门">
                    <v-select v-model="form.deptId" clearable>
                        <v-option label="无" :value="-1"></v-option>
                    </v-select>
                </v-form-item>
                <v-form-item prop="status" label="状态">
                    <v-select v-model="form.status" clearable>
                        <v-option label="有效" :value="true"></v-option>
                        <v-option label="无效" :value="false"></v-option>
                    </v-select>
                </v-form-item>

                <v-form-item >
                   <v-button type="primary" @click="onSearch">查询</v-button>
                   <v-button class="ml-3">重置</v-button>
                </v-form-item>
            </v-form>
        </div>

        <div>
            <v-table :data-source="dataSource">
                  <v-table-column prop="username" label="用户名"></v-table-column>
                  <v-table-column prop="cname" label="姓名"></v-table-column>
                  <v-table-column prop="deptName" label="所属部门"></v-table-column>
                  <v-table-column prop="ip" label="ip"></v-table-column>
                  <v-table-column prop="status" label="状态">
                    <template slot-scope="{row}">{{row.status | transcode('status')}}</template>
                  </v-table-column>
                  <v-table-column prop="opt" label="操作" fixed="right" width="120px">
                      <template slot-scope="{row}">
                          <span class="icon-btn" @click="onEdit(row)"><v-icon type="edit"></v-icon></span>
                          <span class="ml-3 icon-btn" @click="onDelete(row.id)"><v-icon type="delete"></v-icon></span>
                          <span class="ml-3 icon-btn" @click="onViewAuthority(row.id)" title="查看权限"><v-icon type="eye-o"></v-icon></span>
                      </template>
                  </v-table-column>
              </v-table>
        </div>
        <user-authority :visible.sync="authorityVisible" v-bind="authorityProps"></user-authority>
    </div>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator'
import { queryUsers } from '@/api/user'
import UserAuthority from './authority/index.vue'

@Component({
  components: { UserAuthority }
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

    onSearch () {
      this.query()
    }

    onAdd () {

    }

    onEdit (row: any) {

    }

    onDelete (id: any) {

    }

    onViewAuthority (id: any) {
      this.authorityVisible = true
      this.authorityProps.principleId = id
    }

    query () {
      this.loading = true
      queryUsers(this.form).then(data => {
        this.dataSource = data || []
      }).finally(() => {
        this.loading = false
      })
    }

    mounted () {
      this.query()
    }
}
</script>
