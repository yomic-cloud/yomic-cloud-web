<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator'
import { getType } from '@/common/content-type'
import ImagePreview from './image-preview/index.vue'
import OfficePreview from './office-preview/index.vue'

@Component({
  components: { ImagePreview, OfficePreview }
})
export default class FilePreview extends Vue {
  visible: boolean = false

  row: any = null

  rows: any[] = []

  get type (): 'image' | 'video' | 'audio' | 'office' | string {
    if (!this.row) return ''
    return getType(this.row.contentType || '')
  }

  preview (row: any, rows: any = []) {
    this.row = row || null
    this.rows = rows
    this.visible = true
  }

  render (h: any) {
    let props = { row: this.row, rows: this.rows }
    let on = {
      close: () => { this.visible = false }
    }
    if (!this.visible) return h('div')
    return h(`${this.type}-preview`, { props, on })
  }
}
</script>
