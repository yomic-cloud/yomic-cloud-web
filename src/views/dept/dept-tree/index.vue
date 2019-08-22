<template>
    <div>
        <v-tree node-key="key" :data-source="dataSource" lazy :load-fn="loadFn" ref="tree"></v-tree>
    </div>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator'
import { queryDepts } from '@/api/dept'

const mapper = (dept: any) => {
    let ret: any = {
        get key () {
            return dept.id
        },
        get label () {
            return dept.name
        }
    }
    return Object.assign(ret, dept)
}

@Component
export default class DeptTree extends Vue {
    dataSource: any[] = []

    loadFn ({node}: any, resovle: any) {

    }

    // map (dept: any) {

    // }

    loadTop () {
        queryDepts({parentId: -1}).then(data => {
            this.dataSource = (data || []).map(mapper)
        })
    }

    mounted () {
        this.loadTop()
    }
}
</script>
