<template>
    <v-layout :class="[$style.container]">
        <v-sider :dark="sider.dark ? {} : undefined">
            <app-sider></app-sider>
        </v-sider>
        <v-layout>
            <v-header :class="[$style.header]" class="shadow-1-down" :dark="header.dark ? {} : undefined">
                <app-header></app-header>
            </v-header>
            <v-content :class="[$style.content]">
                <router-view/>
            </v-content>
            <v-footer :class="[$style.footer]">
                <app-footer></app-footer>
            </v-footer>
        </v-layout>
    </v-layout>
</template>

<script lang="ts">

import { Vue, Component, Provide } from 'vue-property-decorator'
import AppHeader from './app-header/index.vue'
import AppSider from './app-sider/index.vue'
import AppFooter from './app-footer/index.vue'
import appConfig from '@/common/app-config'

@Component({
  components: { AppHeader, AppSider, AppFooter }
})
export default class Layout extends Vue {
  get header () {
    return appConfig.header
  }

  get sider () {
    return appConfig.sider
  }
}
</script>

<style lang="scss" module>
.container {
    background-color: var(--bg-color-1);
}

.header {
    height: 4rem;
    padding: 0;
    background-color: var(--bg-color);
}

.content {
    overflow: auto;
    height: calc(100vh - 9rem);
    margin: 1rem;
    background-color: var(--bg-color);
}

.footer {
    height: 3rem;
    padding: 0;
}
</style>
