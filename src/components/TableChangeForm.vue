<template>
  <div>
    <PlayerCadre
      v-model='series.players'
      :deleteArea='reelArea'
      :allowChangeOfPlayerNumber='allowChangeOfPlayerNumber'
      @mounted='cadreMounted = true'
      ref='player-cadre'
    />

    <div class="spacer"/>

    <PlayerReel
      :players='playersThatAreNotChosen'
      :dropAreas='seatElements'
      @dropInArea='dropSpriteInSeat'
      @mounted='reelMounted = true'
      ref='player-reel'
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import PlayerCadre from '@/components/PlayerCadre.vue'
import PlayerReel from '@/components/PlayerReel.vue'
import Player from '@/models/player'
import Series from '@/models/series'

@Component({ components: { PlayerCadre, PlayerReel } })
export default class TableChangeForm extends Vue {
  @Prop(Object) private series!: Series
  @Prop(Array) private players!: Player[]
  @Prop(Boolean) private allowChangeOfPlayerNumber!: boolean

  cadreMounted = false
  reelMounted = false

  get seatElements () {
    if (!this.cadreMounted || !this.$refs['player-cadre']) { return }
    return (this.$refs['player-cadre'] as PlayerCadre).seatElements
  }

  get reelArea () {
    if (!this.reelMounted || !this.$refs['player-reel']) { return }
    return (this.$refs['player-reel'] as PlayerReel).$el.getBoundingClientRect()
  }

  dropSpriteInSeat (seatIndex: number, player: Player) {
    if (this.series.players[seatIndex] === null) {
      const ps = this.series.players
      this.$set(ps, seatIndex, player)
      this.$set(this.series, 'players', ps)
      return true
    }
    return false
  }

  get playersThatAreNotChosen () {
    return this.players.filter(p => {
      return !this.series.players.map(pp => pp && pp.id).includes(p.id)
    })
  }

  async save () {
    this.$emit('save')
  }
}
</script>

<style scoped lang="stylus">
</style>
