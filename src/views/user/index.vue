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
                   <v-button type="primary">查询</v-button>
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
                  <v-table-column prop="status" label="状态"></v-table-column>
              </v-table>
        </div>
    </div>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator'
import { queryUsers } from '@/api/user'

@Component
export default class User extends Vue {
    form = {
      username: '',
      cname: '',
      deptId: '',
      status: null
    }

    loading: boolean = false

    dataSource: any[] = []

    // loadData () {
    //     queryUsers().then(data => {
    //         this.dataSource = data || []
    //     })
    // }

    mounted () {
        // this.loadData()
    }
}
</script>
