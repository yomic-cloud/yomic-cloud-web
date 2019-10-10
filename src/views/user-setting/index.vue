<template>
  <div class="my-3">
    <div class="m-3">
      <a @click="$router.go(-1)"> <v-icon type="arrow-left"></v-icon> 返回</a>
    </div>
    <v-tabs v-model="value" position="left" :class="[$style.tabs]">
      <v-tab-pane name="basic" label="基本设置">
        <basic-setting v-if="value === 'basic'"></basic-setting>
      </v-tab-pane>
      <v-tab-pane name="security" label="安全设置">
        <security-setting v-if="value === 'security'"></security-setting>
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
