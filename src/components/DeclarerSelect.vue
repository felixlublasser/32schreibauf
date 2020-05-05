<template>
  <RadioButtons
    v-model='chosenPlayerSeat'
    :labels='playerNames'
    :allowNull='allowNull'
  >
    <span
      v-for='(player, i) in players'
      :key='i'
      :slot='i'
    >{{ player.name[0] }}</span>
    <div slot='spacer' class="spacer-small" />
  </RadioButtons>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import RadioButtons from '@/components/RadioButtons.vue'
import Player from '@/models/player'

@Component({ components: { RadioButtons } })
export default class DeclarerSelect extends Vue {
  @Prop(Array) players!: Player[]
  @Prop(Number) value!: number | null
  @Prop({ type: Boolean, default: false }) allowNull!: boolean

  get chosenPlayerSeat () {
    return (this.value === null) ? this.value : this.value.toString()
  }

  set chosenPlayerSeat (v) {
    this.$emit('input', parseInt(v as string))
  }

  get playerNames () {
    return this.players.reduce((names, player, i) => ({ ...names, [i]: player.name }), {})
  }
}
</script>

<style scoped lang="stylus">
</style>
