<template>
  <span class="text-primary"><svg-icon :icon="icon"></svg-icon></span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { getIcon } from './config'

@Component
export default class FileIcon extends Vue {
  @Prop(Boolean) dir!: boolean

  @Prop(Boolean) personal!: boolean

  @Prop(String) contentType!: string

  @Prop(Boolean) root!: boolean

  get icon (): string {
    if (this.contentType === 'multiple-share') { //
      return 'share-dir'
    }
    if (this.dir) {
      if (this.root) {
        if (this.personal) return 'user-dir'
        return 'root-dir'
      }
      return 'dir'
    }
    return getIcon(this.contentType)
  }
}
</script>
