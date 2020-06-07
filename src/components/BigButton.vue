<template>
  <button
    class="big-button"
    v-on='$listeners'
    :disabled='disabled'
    :class='{
      "big-button--disabled": disabled,
      "big-button--cta": isEnabledCTAButton,
      "big-button--serious": isEnabledSeriousButton,
      "big-button--benign": isEnabledBenignButton,
      "big-button--secondary": isEnabledSecondaryCTAButton
    }'
  >
    <slot/>
  </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class BigButton extends Vue {
  @Prop(Boolean) disabled!: boolean
  @Prop({ type: String, default: 'cta' }) buttonType!: string

  get isEnabledCTAButton () {
    return !this.disabled && this.buttonType === 'cta'
  }

  get isEnabledSeriousButton () {
    return !this.disabled && this.buttonType === 'serious'
  }

  get isEnabledBenignButton () {
    return !this.disabled && this.buttonType === 'benign'
  }

  get isEnabledSecondaryCTAButton () {
    return !this.disabled && this.buttonType === 'secondary'
  }
}
</script>

<style scoped lang="stylus">
.big-button
  height 40px
  width 220px
  border-radius 8px
  border-style solid
  border-width 1px 2px 2px 1px
  cursor pointer
  font-size 16px
  font-weight bold

  &--disabled
    background-color #aaa
    border-color #999
    color white
    border-width 1px
    margin-top 1px
    margin-left 1px
    height 39px
    width 219px

  &--cta
    background-color #014d3b
    border-color #002515
    color #fff

  &--serious
    background-color #e44
    border-color #922
    color #fff

  &--benign
    background-color #384
    border-color #142
    color #fff

  &--secondary
    background-color white
    border-color #999
    color #014d3b

  &:active
    border-width 1px
    margin-top 1px
    margin-left 1px
    height 39px
    width 219px
</style>
