<template>
<div :class="[$style.container]" class="mx-2">
    <v-dropdown placement="bottom-end" :class="[$style.dropdown]">
        <div :class="[$style.reference]">
            <div style="height: auto;" class="px-2">
                <v-avatar type="image"><img src="@/assets/avatar.png" /></v-avatar>
                <span class="ml-2">{{username}}</span>
            </div>
        </div>
        <v-dropdown-menu slot="dropdown">
            <v-dropdown-item class="w-8" @click.native="onLink('/user-setting')">
                <v-icon type="user"></v-icon> <span class="ml-3">个人设置</span>
            </v-dropdown-item>
            <v-dropdown-item divider></v-dropdown-item>
            <v-dropdown-item @click.native="onLogout">
                <v-icon type="logout"></v-icon> <span class="ml-3">退出登录</span>
            </v-dropdown-item>
        </v-dropdown-menu>
    </v-dropdown>
</div>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator'

@Component
export default class GlobalAction extends Vue {
  get username () {
    return this.$auth.username
  }

  onLink (path: string) {
    this.$router.push(path)
  }

  onLogout () {
    this.$auth.logout()
  }
}
</script>

<style lang="scss" module>
.container {
    height: 100%;
    display: flex;
    align-items: center;
    transition: background-color .35s ease;
    &:hover {
        background: var(--bg-color-1);
        cursor: pointer;
    }
}

.dropdown {
    display: block;
    height: 100%;

    & * {
        height: 100%;
    }
}

.reference {
    height: 100%;
    display: flex;
    align-items: center;
}
</style>
