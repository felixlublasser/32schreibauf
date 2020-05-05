<template>
  <button
    class="big-button"
    v-on='$listeners'
    :disabled='disabled'
    :class='{
      "big-button--disabled": disabled
    }'
  >
    <slot class="big-button"/>
  </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class BigButton extends Vue {
  @Prop(Boolean) disabled!: boolean
}
</script>

<style scoped lang="stylus">
.big-button
  height 40px
  width 220px
  background-color #33cc33
  color white
  border-radius 8px
  border-color #999
  border-style solid
  border-width 1px 2px 2px 1px
  cursor pointer
  font-size 16px
  font-weight bold

  &--disabled
    background-color #aaa
    border-width 1px
    margin-top 1px
    margin-left 1px
    height 39px
    width 219px

  &:active
    border-width 1px
    margin-top 1px
    margin-left 1px
    height 39px
    width 219px
</style>
