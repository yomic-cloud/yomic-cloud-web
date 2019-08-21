<template>
<div :class="[$style.container]" class="px-2 mx-2">
    <v-badge :value="100" :max="99">
        <v-icon type="bell" class="text-base ft-24"></v-icon>
    </v-badge>
</div>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator'

@Component
export default class GlobalMessage extends Vue {

}
</script>

<style lang="scss" module>

.container {
    height: 100%;
    display: flex;
    align-items: center;
    transition: background-color .35s ease;
    &:hover {
        background: var(--bg-color-1);
        cursor: pointer;
    }
}

</style>
