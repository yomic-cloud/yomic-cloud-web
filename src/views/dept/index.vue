<template>
    <div :class="[$style.container]">
        <dept-tree :class="[$style.tree]"></dept-tree>
        <dept-detail :class="[$style.detail]"></dept-detail>
    </div>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator'
import DeptTree from './dept-tree/index.vue'
import DeptDetail from './dept-detail/index.vue'

@Component({
  components: { DeptTree, DeptDetail }
})
export default class Dept extends Vue {

}
</script>

<style lang="scss" module>
.container{
    display: flex;
}

.tree {
    width: 320px;
}

.detail {
    width: calc(100% - 320px);
}
</style>
