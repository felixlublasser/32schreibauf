<template>
  <input
    :type='type || "text"'
    :value='value'
    @input.prevent='input'
    @focus='focus'
    class='input-text'
    ref='input'
  >
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class InputText extends Vue {
  @Prop(String) value!: string
  @Prop(String) type!: string

  touched = false

  input (event: Event) {
    if (!event || !event.target) { return }
    const value = (event.target as HTMLTextAreaElement).value
    this.$emit('input', value)
    this.setValue(value)
  }

  focus () {
    if (this.touched) { return }
    this.setValue('')
    this.touched = true
  }

  setValue (v: string) {
    const input = this.$refs.input as HTMLTextAreaElement
    input.value = v
  }
}
</script>

<style scoped lang="stylus">
.input-text
  height 48px
  border-style solid
  border-color #999
  border-radius 8px
  border-width 3px 1px 1px 3px
  font-size 32px
  font-weight bold
  text-align left
  padding 0 8px
</style>
