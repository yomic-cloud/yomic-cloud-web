<template>
    <div>
        暂未实现
    </div>
</template>

<script lang="ts">

import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class FileThumbnail extends Vue {
    @Prop(Array) dataSource!: any[]

    onSelectionChange (rows: any[]) {

    }
}
</script>

<style lang="scss" module>

</style>
