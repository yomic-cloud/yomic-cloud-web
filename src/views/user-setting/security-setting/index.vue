<template>
  <div>
    <div class="title mb-3">密码修改</div>

    <div :class="[$style.content]">
      <v-form label-position="top" class="pr-3" :model="form" :rules="rules" ref="form">
        <v-form-item label="原密码" prop="oldPassword" required>
          <v-input type="password" v-model="form.oldPassword" block maxlength="32"></v-input>
        </v-form-item>
        <v-form-item label="新密码" prop="newPassword" required>
          <v-input type="password" v-model="form.newPassword" block maxlength="32"></v-input>
        </v-form-item>
        <v-form-item label="确认密码" prop="newPassword2" required>
          <v-input type="password" v-model="form.newPassword2" block maxlength="32"></v-input>
        </v-form-item>
        <v-form-item>
          <div class="text-center">
            <v-button @click="onReset">重置</v-button>
            <v-button type="primary" class="ml-3" @click="onSave">保存</v-button>
          </div>
        </v-form-item>
      </v-form>
    </div>
  </div>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator'
import { changePassword } from '@/api/auth'

@Component
export default class SecuritySetting extends Vue {
  form = {
    oldPassword: '',
    newPassword: '',
    newPassword2: ''
  }

  passwordValidator = (rule: any, value: any) => {
    if (!value) return Promise.resolve()
    if (value === this.form.newPassword) return Promise.resolve()
    return Promise.reject(new Error('两次输入密码不一致!'))
  }

  rules = {
    oldPassword: { validator: 'required', message: '请输入原密码' },
    newPassword: { validator: 'required', message: '请输入新密码' },
    newPassword2: [
      { validator: 'required', message: '请输入确认密码' },
      { validator: this.passwordValidator, message: '两次输入密码不一致!' }
    ]
  }

  onReset () {
    const $e = this.$refs.form as any
    if ($e) $e.resetFields()
  }

  onSave () {
    const $e = this.$refs.form as any
    if (!$e) return
    $e.validate().then(({ valid, errors }: any) => {
      if (valid) {
        changePassword(this.form).then(data => {
          this.$message.success('修改密码成功')
          this.onReset()
        })
      }
    })
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
