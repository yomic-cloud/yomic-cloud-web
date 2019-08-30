import Vue from 'vue'
import SectionHeader from './section-header/index.vue'
import { hyphenate } from '@/helpers/lang'

const components: any = {
  SectionHeader
}

Object.keys(components).forEach((key: string) => {
  Vue.component(hyphenate(key), components[key])
})
