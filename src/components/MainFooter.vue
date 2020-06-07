<template>
  <div class="main-footer">
    <div class="main-footer__container">
      <slot/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class MainFooter extends Vue {}
</script>

<style scoped lang="stylus">
.main-footer
  height 50px
  position fixed
  bottom 0
  background-color #384
  width 100vw
  border-top 2px solid #363
  bor

  &__container
    padding 0 8px
    display flex
    align-items center
    justify-content space-around
    height 100%
</style>
