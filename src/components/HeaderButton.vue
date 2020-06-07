<template>
  <button class="header-button" v-on='$listeners'>
    <slot/>
  </button>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class HeaderButton extends Vue {}
</script>

<style scoped lang="stylus">
.header-button
  height 32px
  width 48px
  background-color #eaeaea
  border-radius 8px
  border-color #999
  border-style solid
  border-width 1px 2px 2px 1px
  cursor pointer
  display block

  &:active
    border-width 1px
    margin-top 1px
    margin-left 1px
    height 31px
    width 47px
</style>
