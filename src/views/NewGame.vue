<template>
  <div>
    <MainHeader>
      <BackButton slot='left' @click='$router.back()'/>
      <template slot='title'>Spiel eintragen</template>
      <HeaderButton slot='right' @click='$router.push({ name: "home" })'><IconHome/></HeaderButton>
    </MainHeader>
    <GameForm :game='newGame' @save='save' @input='replaceGame'/>
    <MainFooter>
      <GameDescription :game='newGame'/>
      <div class="spacer"/>
      <BigButton :disabled='newGame && !newGame.isValid' @click='save'><span>Speichern</span></BigButton>
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
import GameRequest from '@/api/gameRequest'
import Series from '@/models/series'
import Game from '@/models/games/game'
import GameBuilder from '@/models/games/gameBuilder'
import GameType from '@/models/gameType'
import Player from '@/models/player'
import SuitGame from '@/models/games/suitGame'

@Component({
  components: {
    BackButton,
    BigButton,
    GameDescription,
    HeaderButton,
    IconHome,
    GameForm,
    MainFooter,
    MainHeader
  }
})
export default class NewGame extends Vue {
  @Action createGame!: (arg: { seriesId: number; params: GameRequest }) => void
  @Action fetchSeries!: (seriesId: number) => void
  @Getter series!: Series | null

  newGame: Game | null = null

  async save () {
    if (!this.newGame) { return }
    const gameData = this.newGame.requestParams
    if (!gameData) { return }

    await this.createGame({ seriesId: this.routeSeriesId, params: gameData })

    this.$router.push({ name: 'seriesGames', params: { seriesId: this.$route.params.seriesId } })
  }

  replaceGame (game: Game) {
    this.newGame = game
  }

  get routeSeriesId () {
    return parseInt(this.$route.params.seriesId)
  }

  get declarerIndexFromRoute () {
    return parseInt(((this.$route.query && this.$route.query.playerIndex) || '') as string)
  }

  async mounted () {
    if (!this.series || this.series.id !== this.routeSeriesId) {
      await this.fetchSeries(this.routeSeriesId)
    }
    if (this.series && !this.series.playersForNextGame.some(p => p === null)) {
      this.newGame = GameBuilder.buildEmpty({
        gameType: GameType.suit,
        players: this.series.playersForNextGame as Player[],
        tableSize: this.series.numberOfPlayers,
        eventIndex: this.series.nextEventIndex,
        index: this.series.games ? this.series.games.length : 0
      })
      const ng = this.newGame as SuitGame
      if (isNaN(this.declarerIndexFromRoute)) { return }
      const declarerSeatFromRoute = ng.seatForPlayerIndex(this.declarerIndexFromRoute)
      if (declarerSeatFromRoute !== null) {
        ng.declarerSeat = declarerSeatFromRoute
      }
    }
  }
}
</script>

<style scoped lang="stylus">
</style>
