<template>
  <div>
    <MainHeader>
      <BackButton slot='left' @click='$router.back()'/>
      <template slot='title'>Serie erstellen</template>
    </MainHeader>
    <div v-if='players.length' class="view">
      <PlayerCadre
        v-model='newSeries.players'
        :deleteArea='reelArea'
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

      <div class="spacer-big"/>

      <BigButton :disabled='!newSeries.isValid'>
        Speichern
      </BigButton>
    </div>
    <MainFooter>
      <IconButton icon='check' @click='save' text='Speichern'/>
    </MainFooter>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'
import MainFooter from '@/components/MainFooter.vue'
import PlayerReel from '@/components/PlayerReel.vue'
import Player from '@/models/player'
import Series from '@/models/series'
import IconButton from '@/components/IconButton.vue'
import MainHeader from '@/components/MainHeader.vue'
import BackButton from '@/components/BackButton.vue'
import BigButton from '@/components/BigButton.vue'
import PlayerCadre from '@/components/PlayerCadre.vue'
import SeriesCreateRequest from '@/api/seriesCreateRequest'
import NewSeries from '@/models/newSeries'

@Component({
  components: { BackButton, BigButton, IconButton, MainFooter, MainHeader, PlayerCadre, PlayerReel }
})
export default class NewSeriesC extends Vue {
  newSeries = new NewSeries()
  cadreMounted = false
  reelMounted = false

  @Action fetchPlayers!: () => void
  @Action createSeries!: (data: SeriesCreateRequest) => Series
  @Getter players!: Player[]
  @Getter series!: Series | null

  async save () {
    await this.createSeries(this.newSeries.createRequestParams)
    if (this.series) {
      this.$router.push({ name: 'seriesGames', params: { seriesId: this.series.id.toString() } })
    }
  }

  get seatElements () {
    if (!this.cadreMounted || !this.$refs['player-cadre']) { return }
    return (this.$refs['player-cadre'] as PlayerCadre).seatElements
  }

  get reelArea () {
    if (!this.reelMounted || !this.$refs['player-reel']) { return }
    return (this.$refs['player-reel'] as PlayerReel).$el.getBoundingClientRect()
  }

  dropSpriteInSeat (seatIndex: number, player: Player) {
    if (this.newSeries.players[seatIndex] === null) {
      this.newSeries.setPlayer(seatIndex, player)
      return true
    }
    return false
  }

  get playersThatAreNotChosen () {
    return this.players.filter(p => {
      return !this.newSeries.players.map(pp => pp && pp.id).includes(p.id)
    })
  }

  async mounted () {
    if (!this.players.length) {
      await this.fetchPlayers()
    }
  }
}
</script>

<style scoped lang="stylus">
</style>
