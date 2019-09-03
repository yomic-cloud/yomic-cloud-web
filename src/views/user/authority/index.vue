<template>
    <div>
        <v-drawer :visible.sync="actualVisible" title="用户文件权限列表" width="720px">
            <authority-list :principle-id="principleId" is-user></authority-list>
        </v-drawer>
    </div>
</template>

<script lang="ts">

import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
import AuthorityList from '@/views/authority/index.vue'

@Component({
  components: { AuthorityList }
})
export default class UserAuthority extends Vue {
  @Prop(Boolean) visible!: boolean

  @Prop(Number) principleId!: number

  @Emit('update:visible') updateVisible (visible: boolean) {}

  get actualVisible () {
    return this.visible
  }

  set actualVisible (visible: boolean) {
    this.updateVisible(visible)
  }
}
</script>
