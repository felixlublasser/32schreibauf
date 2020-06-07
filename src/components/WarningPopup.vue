<template>
  <div @touchend.self='$emit("close")' class="warning-popup">
    <div class="warning-popup__card">
      <button @touchend='$emit("close")' class="warning-popup__close-button">
        <IconCross class="warning-popup__close-icon"/>
      </button>
      <slot name="body"/>
      <div class="spacer-big"/>
      <div class="warning-popup__cta">
        <slot name="cta"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import IconCross from '@/assets/IconCross.vue'

@Component({
  components: { IconCross }
})
export default class SeriesList extends Vue {
}
</script>

<style scoped lang="stylus">
.warning-popup
  position absolute
  top 0
  left 0
  width 100%
  height 100%
  display flex
  align-items center
  justify-content center
  background-color rgba(0, 0, 0, 0.5)

  &__card
    width 80%
    max-width 400px
    background-color white
    border-radius 8px
    padding 8px
    display flex
    flex-direction column
    align-items center

  &__close-button
    width 32px
    height 32px
    align-self flex-end
    border none
    border-radius 0 8px 0 0
    padding 0
    margin -8px -8px 0 0
    background-color #fff

    &:active
      background-color #ddd

  &__close-icon
    width 16px
    height 16px
    margin 8px

  &__cta
    width 100%
</style>
