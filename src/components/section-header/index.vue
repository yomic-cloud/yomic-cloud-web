<template>
  <div :class="[$style.container]">
    <span :class="[$style.indicator]"></span>
    <span :class="[$style.content]"><slot></slot></span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class SectionHeader extends Vue {

}
</script>

<style lang="scss" module>
.container {
  display: flex;
  line-height: 32px;
  height: 32px;
  background-color: var(--primary-lighten-5);
  margin: 8px 0;
}
.indicator {
  height: 20px;
  width: 4px;
  background: var(--primary-base);
  margin: 6px 8px 6px 0;

}

.content {
  font-weight: bold;
}
</style>
