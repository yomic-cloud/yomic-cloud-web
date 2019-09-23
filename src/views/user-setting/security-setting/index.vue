<template>
  <div>
    <div class="title mb-3">密码修改</div>

    <div :class="[$style.content]">
      <v-form label-position="top" class="pr-3">
        <v-form-item label="原密码" required>
          <v-input type="password" v-model="form.oldPassword" block></v-input>
        </v-form-item>
        <v-form-item label="新密码" required>
          <v-input type="password" v-model="form.newPassword" block></v-input>
        </v-form-item>
        <v-form-item label="确认密码" required>
          <v-input type="password" v-model="form.newPassword1" block></v-input>
        </v-form-item>
        <v-form-item>
          <div class="text-center">
            <v-button>重置</v-button>
            <v-button type="primary" class="ml-3">保存</v-button>
          </div>
        </v-form-item>
      </v-form>
    </div>
  </div>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator'

@Component
export default class SecuritySetting extends Vue {
  form = {
    oldPassword: '',
    newPassword: '',
    mewPassword2: ''
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
