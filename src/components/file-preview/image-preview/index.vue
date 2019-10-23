<template>
  <div :class="$style.container">
    <viewer :images="images">
      <img v-for="src in images" :src="src" :key="src">
    </viewer>
    <div :class="[$style.close]" @click="onClose"><v-icon type="close-circle-o"></v-icon></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import BasePreview from '../BasePreview'
import { previewFile } from '@/api/file'
import { getType } from '@/common/content-type'

@Component
export default class ImagePreview extends mixins(BasePreview) {
  images: string[] = []

  get ids (): number[] {
    return (this.rows || []).filter((v: any) => getType(v.contentType) === 'image').map((v: any) => v.id)
  }

  genUrls () {
    this.ids.forEach(v => {
      previewFile(v).then(data => {
        const blob = new Blob([data])
        const url = URL.createObjectURL(blob)
        this.images.push(url)
      })
    })
  }

  onClose () {
    this.close()
  }

  mounted () {
    this.genUrls()
  }

  beforeDestroy () {
    this.images.forEach(v => {
      window.URL.revokeObjectURL(v)
    })
  }
}
</script>

<style lang="scss" module>
.container {
  position: fixed;
  z-index: 2014;
  left: 0;
  top: 0;
  height: 100vh;
  width: 100vw;
  background-color: #fff;
  padding: 2rem;
}

.close {
  position: absolute;
  right: .5rem;
  top: .5rem;
  font-size: 2rem;
  cursor: pointer;
}
</style>
