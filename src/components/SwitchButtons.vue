<template>
  <div
    class="switch-buttons__container"
    :class='horizontal ? "stack-horizontal" : "stack-vertical"'
  >
    <span v-if='labels' class="switch-buttons__label">{{ labels[0] }}</span>
    <div
      class="switch-buttons__buttons"
      :class='horizontal ? "stack-horizontal" : "stack-vertical"'
    >
      <button
        class="switch-buttons__button"
        :class='{
          "switch-buttons__button--depressed": value === true,
          "switch-buttons__button--top": !horizontal,
          "switch-buttons__button--left": horizontal,
        }'
        @click='$emit("input", true)'
      >
        <slot name='true' />
      </button>

      <button
        class="switch-buttons__button"
        :class='{
          "switch-buttons__button--depressed": value === false,
          "switch-buttons__button--bottom": !horizontal,
          "switch-buttons__button--right": horizontal,
        }'
        @click='$emit("input", false)'
      >
        <slot name='false' />
      </button>
    </div>
    <span v-if='labels' class="switch-buttons__label">{{ labels[1] }}</span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class SwitchButtons extends Vue {
  @Prop(Boolean) value!: boolean
  @Prop(Array) labels!: string[]
  @Prop({ type: Boolean, default: false }) horizontal!: boolean
}
</script>

<style scoped lang="stylus">
.switch-buttons
  &__container
    align-items center

  &__buttons
    align-items flex-start
    margin-top 2px
    margin-left 2px

  &__button
    width 52px
    height 52px
    background-color #eee
    border-radius 8px
    font-size 32px
    font-weight bold
    cursor pointer
    border-width 1px 3px 3px 1px
    border-style solid
    border-color #999
    margin-top -2px
    margin-left -2px
    display flex
    align-items center
    justify-content center

    &--depressed
      background-color #ccc
      border 1px solid #333
      margin 0
      width 50px
      height 50px

    &--top
      border-bottom-left-radius 0
      border-bottom-right-radius 0

    &--bottom
      border-top-left-radius 0
      border-top-right-radius 0

    &--left
      border-top-right-radius 0
      border-bottom-right-radius 0

    &--right
      border-top-left-radius 0
      border-bottom-left-radius 0

  &__label
    font-size 14px
    max-width 114px
    display block
</style>
