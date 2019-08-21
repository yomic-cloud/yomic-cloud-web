<template>
<div>
    <v-input v-model.trim="value" placeholder="搜索" suffix="search"></v-input>
</div>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator'

@Component
export default class GlobalSearrch extends Vue {
    value: string = ''
}
</script>
