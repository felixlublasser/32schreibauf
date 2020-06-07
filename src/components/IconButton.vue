<template>
  <div class="icon-button" @click='click'>
    <span v-if='text' class="icon-button__label">{{ text }}</span>
    <button
      :disabled='disabled'
      class="icon-button__button"
      :class='{
        "icon-button__button--disabled": disabled,
        "icon-button__button--red": !disabled && color === "red"
      }'
    >
      <component :is='iconComponent' class="icon-button__icon"/>
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import IconPlus from '@/assets/IconPlus.vue'
import IconCheck from '@/assets/IconCheck.vue'
import IconMinus from '@/assets/IconMinus.vue'

@Component({
  components: { IconCheck, IconPlus, IconMinus }
})
export default class IconButton extends Vue {
  @Prop(String) icon!: string
  @Prop(String) text!: string
  @Prop(Boolean) disabled!: boolean
  @Prop(String) color!: string

  get iconComponent () {
    const icons: { [index: string]: {} } = {
      check: IconCheck,
      plus: IconPlus,
      minus: IconMinus
    }
    return icons[this.icon]
  }

  click () {
    this.$emit('click')
  }
}
</script>

<style scoped lang="stylus">
.icon-button
  padding 4px 0
  cursor pointer
  display flex
  align-items center

  &__label
    margin-right 8px
    font-size 16px

  &__button
    background-color #eaeaea
    color white
    font-weight bold
    font-size 24px
    display flex
    justiy-content center
    align-items center
    padding 4px
    border-style solid
    border-width 1px 2px 2px 1px
    border-color #228
    border-radius 8px
    line-height 24px
    cursor pointer

    &:active
      border-width 1px
      margin-top 1px
      margin-left 1px

    &--disabled
      background-color #aaa
      border-color #777
      border-width 1px
      margin-top 1px
      margin-left 1px

    &--red
      background-color #a22
      border-color #711

  &__icon
    stroke #014d3b
    stroke-width 1px
    fill #014d3b
</style>
