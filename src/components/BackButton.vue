<template>
  <button class="back-button" v-on='$listeners'>
    <span class="back-button__label">V</span>
  </button>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class BackButton extends Vue {}
</script>

<style scoped lang="stylus">
.back-button
  height 32px
  width 48px
  background-color #eaeaea
  border-radius 8px
  border-color #999
  border-style solid
  border-width 1px 2px 2px 1px
  cursor pointer

  &:active
    border-width 1px
    margin-top 1px
    margin-left 1px
    height 31px
    width 47px

  &__label
    transform rotate(90deg)
    display block
    font-size 20px
</style>
