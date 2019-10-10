import { Component, Prop, Vue, Emit } from 'vue-property-decorator'

@Component
export default class BasePreview extends Vue {
  @Prop() row!: any

  @Prop() rows!: any[]

  @Emit() close () {}
}
