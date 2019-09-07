import Vue from 'vue'
import SectionHeader from './section-header/index.vue'
import FileIcon from './file-icon/index.vue'
import { hyphenate } from '@/helpers/lang'

const components: any = {
  SectionHeader,
  FileIcon
}

Object.keys(components).forEach((key: string) => {
  Vue.component(hyphenate(key), components[key])
})
