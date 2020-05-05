<template>
  <Stacker v-bind='stackerProps'>
    <slot name='spacer' slot='spacer' />
    <template v-for='option in options'>
      <Checkbox
        :slot='option'
        :key='option'
        :value='value === option'
        :label='labels && labels[option]'
        @input='setOption($event, option)'
      >
        <slot :name='option'/>
      </Checkbox>
    </template>
  </Stacker>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Checkbox from '@/components/Checkbox.vue'
import Stacker from '@/components/Stacker.vue'

@Component({ components: { Checkbox, Stacker } })
export default class RadioButtons extends Vue {
  @Prop(String) value!: string | null
  @Prop(Object) labels!: { [index: string]: string }
  @Prop({ type: Boolean, default: false }) allowNull!: boolean
  @Prop(Object) stackerProps!: object

  get options () {
    return Object.keys(this.$slots).filter(s => s !== 'spacer')
  }

  setOption (v: boolean, option: string) {
    if (v) {
      this.$emit('input', option)
    } else if (this.allowNull) {
      this.$emit('input', null)
    }
  }
}
</script>

<style scoped lang="stylus">
</style>
