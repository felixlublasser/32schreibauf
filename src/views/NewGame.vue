<template>
  <div>
    <MainHeader>
      <BackButton slot='left' @click='$router.back()'/>
      <template slot='title'>Spiel eintragen</template>
    </MainHeader>
    <div v-if='initialized' class="view">
      <div class="section">
        <h2 class="section-title">Spieltyp</h2>
        <RadioButtons v-model='gameType' :labels='gameTypeLabels'>
          <span slot='suit' class="new-game__suit-label">{{ '♦♥ ♠♣' }}</span>
          <span slot='grand'>{{ 'G' }}</span>
          <span slot='null'>{{ '0' }}</span>
          <span slot='ramsch'>{{ 'R' }}</span>
          <span slot='passedOut'>{{ 'E' }}</span>
          <div slot='spacer' class="spacer-small" />
        </RadioButtons>
      </div>

      <div class='new-game__separator'/>

      <component v-if='newGame' :is='optionsComponent' :newGame='newGame' />

      <div class='spacer-huge' />
    </div>

    <div class="section new-game__value-footer">
      <template v-if='initialized'>
        <Interpolator :string='newGame.description' class="new-game__description">
          <i slot='text' slot-scope='{ text }' class='label-big'>{{ text }}</i>
          <b slot='bold' slot-scope='{ text }' class='label-big'>{{ text }}</b>
          <i slot='superscript' slot-scope='{ text }' class='new-game__with'>{{ text }}</i>
          <i slot='subscript' slot-scope='{ text }' class='new-game__without'>{{ text }}</i>
          <span slot='suit' slot-scope='{ text }' class='new-game__suit'>{{ text }}</span>
        </Interpolator>
        <div class='spacer-big'/>
        <span class='label-big'>{{ newGame.totalValue }}</span>
      </template>
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
import IconButton from '@/components/IconButton.vue'
import GameCreateRequest from '@/api/gameCreateRequest'
import Series from '@/models/series'
import RadioButtons from '@/components/RadioButtons.vue'
import SuitOptions from '@/components/SuitOptions.vue'
import GrandOptions from '@/components/GrandOptions.vue'
import NullOptions from '@/components/NullOptions.vue'
import RamschOptions from '@/components/RamschOptions.vue'
import MainHeader from '@/components/MainHeader.vue'
import BackButton from '@/components/BackButton.vue'
import Game from '@/models/games/game'
import GameBuilder from '@/models/games/gameBuilder'
import GameType from '@/models/gameType'
import Interpolator from '@/components/Interpolator.vue'

@Component({
  components: {
    BackButton,
    IconButton,
    Interpolator,
    GrandOptions,
    MainFooter,
    MainHeader,
    NullOptions,
    RadioButtons,
    RamschOptions,
    SuitOptions
  }
})
export default class NewGameC extends Vue {
  @Action createGame!: (arg: { seriesId: number; params: GameCreateRequest }) => void
  @Action fetchSeries!: (seriesId: number) => void

  @Getter series!: Series | null

  newGame: Game | null = null

  gameTypeV: GameType = GameType.suit

  initialized = false

  get gameTypeOptions () {
    return ['suit', 'grand', 'null', 'ramsch', 'passedOut']
  }

  get gameTypeLabels () {
    return { suit: 'Farbe', grand: 'Grand', null: 'Null', ramsch: 'Ramsch', passedOut: 'Eingep.' }
  }

  async save () {
    if (!this.newGame) { return }
    const gameData = this.newGame.createRequestParams
    if (!gameData) { return }

    await this.createGame({ seriesId: this.routeSeriesId, params: gameData })

    this.$router.push({ name: 'seriesGames', params: { seriesId: this.$route.params.seriesId } })
  }

  get routeSeriesId () {
    return parseInt(this.$route.params.seriesId)
  }

  get optionsComponent () {
    if (!this.newGame) { return null }
    const comps: {[index: string]: string | null } = {
      suit: 'SuitOptions',
      grand: 'GrandOptions',
      null: 'NullOptions',
      ramsch: 'RamschOptions',
      passedOut: null
    }
    return comps[this.gameType]
  }

  get declarerSeatFromRoute () {
    if (this.series === null) { return 0 }
    const playerIndexS = ((this.$route.query && this.$route.query.playerIndex) || '') as string
    const playerIndex = parseInt(playerIndexS)
    if (!isNaN(playerIndex)) {
      const seat = this.series.playerIndicesForNextGame.findIndex(i => i === playerIndex)
      return Math.max(seat, 0)
    }
    return 0
  }

  get gameType () {
    return this.gameTypeV
  }

  set gameType (g: GameType) {
    if (this.newGame === null) { return }

    this.gameTypeV = g
    this.newGame.gameType = this.gameType
    this.newGame = GameBuilder.build(this.newGame.data)
  }

  async mounted () {
    if (!this.series || this.series.id !== this.routeSeriesId) {
      await this.fetchSeries(this.routeSeriesId)
    }
    if (this.series) {
      this.newGame = GameBuilder.buildEmpty(
        this.gameType,
        this.series && this.series.playersForNextGame,
        this.series.nextGameIndex
        // this.declarerSeatFromRoute
      )
    }
    this.initialized = true
  }
}
</script>

<style scoped lang="stylus">
.new-game
  &__suit-label
    font-size 15px
    line-height 18px
    font-weight normal
    display block

  &__separator
    border-bottom 1px solid #333
    margin 8px 0

  &__value-footer
    height 50px
    position fixed
    bottom 40px
    width 100%
    margin 0
    display flex
    flex-direction row
    justify-content center
    align-items baseline

  &__description
    display flex
    align-items baseline

  &__suit
    font-size 48px

  &__with
    font-size 20px
    align-self flex-start
    margin-top 14px
    margin-left -2px

  &__without
    font-size 20px
    align-self flex-end
    margin-bottom 5px
    margin-left -2px
</style>
