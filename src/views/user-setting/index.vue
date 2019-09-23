<template>
  <div class="my-3">
    <v-tabs v-model="value" position="left" :class="[$style.tabs]">
      <v-tab-pane name="basic" label="基本设置">
        <basic-setting></basic-setting>
      </v-tab-pane>
      <v-tab-pane name="security" label="安全设置">
        <security-setting></security-setting>
      </v-tab-pane>
    </v-tabs>
  </div>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator'
import BasicSetting from './basic-setting/index.vue'
import SecuritySetting from './security-setting/index.vue'

@Component({
  components: { BasicSetting, SecuritySetting }
})
export default class UserSetting extends Vue {
  value: string ='basic'
}
</script>

<style lang="scss" module>
.tabs {
  :global {
    .v-tabs__nav {
      width: 240px;
    }
  }
}
</style>
