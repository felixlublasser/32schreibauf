<template>
  <div>
    <MainHeader>
      <BackButton slot='left' @click='$router.back()'/>
      <template slot='title'>Spiel bearbeiten</template>
      <HeaderButton slot='right' @click='$router.push({ name: "home" })'><IconHome/></HeaderButton>
    </MainHeader>
    <GameForm :game='game' @save='save' @input='replaceGame'/>
    <MainFooter>
      <GameDescription :game='game'/>
      <div class="spacer"/>
      <BigButton @click='save'><span>Speichern</span></BigButton>
    </MainFooter>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'
import BackButton from '@/components/BackButton.vue'
import BigButton from '@/components/BigButton.vue'
import GameDescription from '@/components/GameDescription.vue'
import GameForm from '@/components/GameForm.vue'
import HeaderButton from '@/components/HeaderButton.vue'
import IconHome from '@/assets/IconHome.vue'
import MainFooter from '@/components/MainFooter.vue'
import MainHeader from '@/components/MainHeader.vue'
import Series from '@/models/series'
import Game from '@/models/games/game'
import GameRequest from '@/api/gameRequest'

@Component({
  components: {
    BackButton,
    BigButton,
    GameDescription,
    GameForm,
    HeaderButton,
    IconHome,
    MainFooter,
    MainHeader
  }
})
export default class EditGame extends Vue {
  @Action updateGame!: (arg: { seriesId: number; gameId: number; params: GameRequest }) => void
  @Action fetchSeries!: (seriesId: number) => void
  @Action fetchSeriesGames!: (seriesId: number) => void
  @Getter series!: Series | null

  game: Game | null = null

  async save () {
    if (!this.game) { return }
    const gameData = this.game.requestParams
    if (gameData === null) { return }

    await this.updateGame({
      seriesId: this.routeSeriesId,
      gameId: this.routeGameId,
      params: gameData
    })

    this.$router.push({ name: 'seriesGames', params: { seriesId: this.$route.params.seriesId } })
  }

  replaceGame (game: Game) {
    this.game = game
  }

  get routeSeriesId () {
    return parseInt(this.$route.params.seriesId)
  }

  get routeGameId () {
    return parseInt(this.$route.params.gameId)
  }

  async mounted () {
    if (!this.series || this.series.id !== this.routeSeriesId) {
      await this.fetchSeries(this.routeSeriesId)
    }
    await this.fetchSeriesGames(this.routeSeriesId)
    if (this.series && this.series.games) {
      const foundGame = this.series.games.find(g => g.id === this.routeGameId)
      if (foundGame) { this.game = foundGame }
    }
  }
}
</script>

<style scoped lang="stylus">
</style>
