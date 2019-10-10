<template>
    <div class="p-3">
        <div v-if="dept">
          <div>
            <section-header>基本信息</section-header>
            <div>
                  <span>
                      <span> <span class="text-secondary mr-3">部门名称:</span> <span>{{dept && dept.name}}</span></span>
                  </span>
              </div>
          </div>

          <div class="mt-4">
            <section-header>权限列表</section-header>
            <authority-list :principle-id="id" :is-user="false" v-if="dept"></authority-list>
          </div>
        </div>
        <div v-else>
          <span>暂无数据</span>
        </div>
    </div>
</template>

<script lang="ts">

import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { getDept } from '@/api/dept'
import AuthorityList from '@/views/authority/index.vue'

@Component({
  components: { AuthorityList }
})
export default class DeptDetail extends Vue {
    @Prop(Number) id!: number

    dept: any = null

    loadDept () {
      if (!this.id) {
        this.dept = null
        return
      }
      getDept(this.id).then(data => {
        this.dept = data || null
      })
    }

    @Watch('id', { immediate: true }) idChange () {
      this.loadDept()
    }
}
</script>
