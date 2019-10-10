<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator'
import ImagePreview from './image-preview/index.vue'

@Component({
  components: { ImagePreview }
})
export default class FilePreview extends Vue {
  @Prop(Boolean) visible!: boolean

  @Prop() row!: any

  @Prop() rows!: any[]

  @Emit('update:visible') updateVisible (visible: boolean) {}

  get type (): 'image' | 'video' | 'audio' | 'other' {
    return 'image'
  }

  render (h: any) {
    let props = this.$props
    let on = {
      close: () => this.updateVisible(false)
    }
    if (!this.visible) return h('div')
    return h(`${this.type}-preview`, { props, on })
  }
}
</script>
