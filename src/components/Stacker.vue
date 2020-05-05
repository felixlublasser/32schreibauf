<template>
  <div v-if='wrap && wrap > 1'>
    <template v-for='_, i in Math.ceil(visibleSlots.length / wrap)'>
      <slot v-if='i !== 0' name="spacer"/>
      <div
        :key='i'
        :class='{ "stack-horizontal": !vertical, "stack-vertical": vertical }'
      >
        <template v-for='_, j in wrap'>
          <slot v-if='j !== 0' name="spacer"/>
          <slot :name='visibleSlots[(i * wrap) + j]'/>
        </template>
      </div>
    </template>
  </div>

  <div
    v-else
    :class='{ "stack-horizontal": !vertical, "stack-vertical": vertical }'
  >
    <template v-for='_, i in visibleSlots.length'>
      <slot v-if='i !== 0' name="spacer"/>
      <slot :name='visibleSlots[i]'/>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Stacker extends Vue {
  @Prop(Number) wrap!: number
  @Prop({ type: Function, default: () => true }) show!: (slotNumber: number) => boolean
  @Prop({ type: String, default: 'horizontal' }) direction!: string

  get visibleSlots () {
    return Object.keys(this.$slots).filter(s => this.show(parseInt(s)))
  }

  get vertical () {
    return this.direction === 'vertical'
  }
}
</script>

<style scoped lang="stylus">
</style>
