<template>
<div :class="[$style.container]">
    <span class="text-primary ft-24 ml-4">Vua Pro</span>

    <span :class="[$style.opt]">
        <global-search></global-search>
        <global-message></global-message>
        <global-action></global-action>
        <theme-chooser></theme-chooser>
    </span>
</div>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator'
import GlobalSearch from './global-search/index.vue'
import GlobalMessage from './global-message/index.vue'
import GlobalAction from './global-action/index.vue'
import ThemeChooser from './theme-chooser/index.vue'

@Component({
  components: { GlobalSearch, GlobalMessage, GlobalAction, ThemeChooser }
})
export default class AppHeader extends Vue {

}
</script>

<style lang="scss" module>
.container {
    height: 100%;
    // background-color: #354052;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.opt {
    display: flex;
    align-items: center;
    height: 100%;
}
</style>
