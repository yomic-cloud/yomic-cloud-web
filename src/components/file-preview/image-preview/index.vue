<template>
  <div :class="$style.container" v-if="visible">
    <viewer :images="images">
      <img v-for="src in images" :src="src" :key="src">
    </viewer>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import BasePreview from '../BasePreview'

@Component
export default class ImagePreview extends mixins(BasePreview) {
  get images (): string[] {
    const baseUrl = 'http://localhost:3000'
    return (this.rows || []).map(v => `${baseUrl}/files/${v.id}/download`)
  }
}
</script>

<style lang="scss" module>
.container {
  position: fixed;
  z-index: 3000;
  left: 0;
  top: 0;
  height: 100vh;
  width: 100vw;
  background-color: #fff;
}
</style>
