<template>
<div></div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import BasePreview from '../BasePreview'
import { previewFile } from '@/api/file'
import { preview } from '@/helpers/download'

@Component
export default class OfficePreview extends mixins(BasePreview) {
  mounted () {
    previewFile(this.row.id).then(data => {
      preview(data, this.row.name + '.pdf')
      this.close()
    })
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
