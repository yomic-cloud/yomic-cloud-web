<template>
    <div>
        <ul :class="[$style.list]">
            <li :class="[$style.item, activeCls(row)]" v-for="(row, i) in dataSource" :key="i" @click="onPreview(row)">
                <div class="text-center"><file-icon v-bind="iconProps(row)" class="ft-64"></file-icon></div>
                <div class="text-truncate text-center px-3">{{row.name}}</div>
                <div :class="[$style.checkbox]" @click.stop="onCheck(row)"><v-icon type="check-circle"></v-icon></div>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">

import { Vue, Component, Prop, Emit, Inject } from 'vue-property-decorator'

@Component
export default class FileThumbnail extends Vue {
    @Prop(Array) dataSource!: any[]

    @Prop(Array) checkedRows!: any[]

    @Emit('update:checked-rows') updateCheckedRows (files: any) {}

    @Inject() onPreview!: (row: any) => void

    iconProps (row: any) {
      let dir = row.dir
      let personal = row.personal
      let root = false
      let contentType = row.contentType
      return { dir, personal, root, contentType }
    }

    activeCls (row: any) {
      return this.checkedRows.includes(row) ? (this as any).$style.active : ''
    }

    onCheck (row: any) {
      let copy = this.checkedRows.slice()
      let idx = copy.findIndex((v: any) => v === row)
      if (idx !== -1) {
        copy.splice(idx, 1)
      } else {
        copy.push(row)
      }
      this.updateCheckedRows(copy)
    }
}
</script>

<style lang="scss" module>
.list{
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
}

.item {
    width: 120px;
    height: 127px;
    margin: 4px 0 0 6px;
    border-radius: 4px;
    position: relative;

    &:hover {
        background-color: var(--primary-lighten-5);
        transition: background-color .35s ease;
        &>.checkbox {
            visibility: visible;
        }
    }
    &.active {
        background-color: var(--primary-lighten-5);
        border: 1px solid var(--primary-base);
        &>.checkbox {
            visibility: visible;
            color: var(--primary-base);
        }
    }
}

.checkbox {
    position: absolute;
    left: 4px;
    top: 4px;
    color: var(--primary-lighten-4);
    visibility: hidden;

    &:hover {
        color: var(--primary-lighten-3);
        cursor: pointer;
    }
}
</style>
