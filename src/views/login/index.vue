<template>
    <div :class="[$style.container]">
        <div :class="[$style.box]" class="elevation-4 border rounded p-4" @keyup.enter="onLogin">
            <div :class="[$style.logo]"></div>
            <div :class="[$style.title]" class="display-4 text-center mb-3">
                Vua Pro
            </div>

            <form @submit.prevent>
                <div class="mb-3">
                    <v-input name="username" v-model.trim="form.username" placeholder="输入账号" size="lg" block prefix="user" maxlength="32"></v-input>
                </div>
                <div class="mb-3">
                    <v-input name="password" v-model.trim="form.password" placeholder="输入账号" size="lg" block prefix="lock" type="passworrd" maxlength="32"></v-input>
                </div>

                <div class="mb-3 text-right">
                    <a> <v-icon type="key" class="mr-2"></v-icon> 忘记密码</a>
                </div>

                <v-button type="primary" size="lg" block @click="onLogin" :loading="loading">登 录</v-button>
            </form>
        </div>
    </div>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator'

@Component
export default class Login extends Vue {
    form = {
      username: '',
      password: ''
    }

    loading: boolean = false

    onLogin () {
      this.$auth.login(this.form)
    }
}
</script>

<style lang="scss" module>
.container {
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: linear-gradient(180deg,hsla(0,0%,100%,0) 60%,#fff),linear-gradient(70deg,#dbedff 32%,#ebfff0);
}

.box {
    width: 420px;
    height: 360px;
    background: #fff;
}

.logo {

}
</style>
