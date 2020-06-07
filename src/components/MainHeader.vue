<template>
  <div class="main-header">
    <div class="main-header__container">
      <div class="main-header__button-container">
        <slot name='left'/>
      </div>
      <div class="main-header__title-container">
        <slot name='title'/>
      </div>
      <div class="main-header__button-container">
        <slot name='right'/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class MainHeader extends Vue {
}
</script>

<style scoped lang="stylus">
.main-header
  height 40px
  position fixed
  top 0
  background-color #384
  width 100vw
  border-bottom 2px solid #363

  &__container
    height 100%
    padding 0 8px
    display flex
    align-items center
    justify-content space-between
    font-size 24px
    font-weight bold
    color #fff

  &__button-container
    width 48px

  &__title-container
    flex-grow 1
</style>
