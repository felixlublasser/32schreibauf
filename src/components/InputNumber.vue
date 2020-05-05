<template>
  <input
    type='number'
    :value='valueS'
    @input.prevent='input'
    @blur='blur'
    @focus='focus'
    class='input-number'
    ref='input'
  >
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class InputNumber extends Vue {
  @Prop(Number) value!: number
  @Prop(Number) min!: number
  @Prop(Number) max!: number

  touched = false

  input (event: Event) {
    if (!event || !event.target) { return }
    let newValue = parseInt((event.target as HTMLTextAreaElement).value.replace(/[^0-9]/g, ''))
    if (isNaN(newValue)) {
      newValue = 0
    }
    this.$emit('input', newValue)
    this.setValue(newValue.toString())
  }

  blur () {
    if (this.value < this.min) {
      this.$emit('input', this.min)
    } else if (this.value > this.max) {
      this.$emit('input', this.max)
    }
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

  get valueS () {
    return this.value.toString()
  }
}
</script>

<style scoped lang="stylus">
.input-number
  height 48px
  border-style solid
  border-color #999
  border-radius 8px
  border-width 3px 1px 1px 3px
  font-size 32px
  font-weight bold
  text-align right
  padding 0 8px
</style>
