<template>
    <div>
        <v-drawer :visible.sync="actualVisible" title="Basic Drawer"></v-drawer>
    </div>
</template>

<script lang="ts">

import { Vue, Component, Prop, Emit } from 'vue-property-decorator'

@Component
export default class UserAuthority extends Vue {
  @Prop(Boolean) visible!: boolean

  @Emit('update:visible') updateVisible (visible: boolean) {}

  get actualVisible () {
    return this.visible
  }

  set actualVisible (visible: boolean) {
    this.updateVisible(visible)
  }
}
</script>
