<template>
<div :class="[$style.container]">
    <div class="text-center my-3">
        <img src="@/assets/logo.png" alt="&times;" class="w-3">
    </div>
    <nav-menu style="width: 12rem;"></nav-menu>

    <div :class="[$style.hoverTrigger]" @click="onTrigger">
        <v-icon :type="iconType"></v-icon>
    </div>
</div>
</template>

<script lang="ts">

import { Vue, Component, Inject } from 'vue-property-decorator'
import NavMenu from './nav-menu/index.vue'
import { AppModule } from '../../../store'

@Component({
  components: { NavMenu }
})
export default class AppSider extends Vue {
    @AppModule.State expand!: boolean

    @AppModule.Mutation setExpand!: (expand: boolean) => void

    get iconType () {
      return this.expand ? 'left-circle-o' : 'right-circle-o'
    }

    onTrigger () {
      this.setExpand(!this.expand)
    }
}
</script>

<style lang="scss" module>
.container {
    height: 100vh;
    overflow: auto;
    background-color: var(--bg-color);
    box-shadow: 2px 0 6px var(--bg-color-2);
    position: relative;
}

.hoverTrigger {
    position: absolute;
    bottom: 2rem;
    left: 50%;
    font-size: 1.5rem;
    // color: #999;
    transition: all .3s;
    transform: translateX(-50%);
    &:hover {
      color: var(--primary-base);
      cursor: pointer;
      &>* {
        transform: scale(1.1);
      }
    }
}
</style>
