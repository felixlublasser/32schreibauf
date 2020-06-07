<template>
  <div
    @click='$emit("input", !value)'
    class="checkbox__container"
  >
    <button
      class="checkbox__button"
      :class='{ "checkbox__button--depressed": value }'
    >
      <slot>{{ content }}</slot>
    </button>
    <span class="checkbox__label">{{ label }}</span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Checkbox extends Vue {
  @Prop(Boolean) value!: boolean
  @Prop(String) content!: string
  @Prop(String) label!: string
}
</script>

<style scoped lang="stylus">
.checkbox
  &__container
    display flex
    flex-direction column
    align-items center

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
    display block
    outline none

    &--depressed
      background-color #ccc
      border 1px solid #333
      margin-top 2px
      margin-left 2px
      width 50px
      height 50px

  &__label
    font-size 14px
    display block
</style>
