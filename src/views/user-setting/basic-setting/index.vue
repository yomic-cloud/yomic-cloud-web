<template>
  <div>
    <div class="title mb-3">基本设置</div>

    <div :class="[$style.content]">
      <v-form label-position="top" class="pr-3">
        <v-form-item label="用户名">
          <v-input :value="user.username" readonly block></v-input>
        </v-form-item>
        <v-form-item label="中文名">
          <v-input :value="user.cname" readonly block></v-input>
        </v-form-item>
        <v-form-item label="ip">
          <v-input :value="user.ip" readonly block></v-input>
        </v-form-item>
         <v-form-item label="归属部门">
          <v-input :value="user.deptName" readonly block></v-input>
        </v-form-item>
      </v-form>

      <div class="text-center">
        <div>头像</div>
        <div class="my-4">
          <img src="@/assets/avatar.png" class="w-6" alt="&times;">
        </div>
        <v-button type="outline" icon="upload">更换头像</v-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator'

@Component({
  components: { }
})
export default class BasicSetting extends Vue {
  get user () {
    return this.$auth.principle
  }
}
</script>

<style lang="scss" module>
.content {
  display: flex;
  &>*{
    width: 50%;
  }
}
</style>
