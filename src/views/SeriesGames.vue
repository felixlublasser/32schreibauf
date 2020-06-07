<template>
  <div>
    <MainHeader>
      <BackButton slot='left' @click='goToHome'/>
      <div v-if='isSeriesLoaded' slot='title' @click='goToEditSeries'>{{ series.date | localeDate }}</div>
      <HeaderButton slot='right' @click='$router.push({ name: "home" })'><IconHome/></HeaderButton>
    </MainHeader>
    <div v-if='isSeriesLoaded' class="view">
      <template v-if='series.games'>
        <template v-if='gamesExpanded'>
          <div class="spacer"/>
          <div class="series-games__score-area">
            <ScoreColumn
              v-for='_, playerIndex in series.numberOfPlayers'
              :key='`column-${playerIndex}`'
              :events='series.events'
              :highlightedGameId='selectedGameId'
              :numberOfPlayers='series.numberOfPlayers'
              :playerIndex='playerIndex'
              :playerParticipatesInNextGame='series.playerIndicesForNextGame.includes(playerIndex)'
              :seriesOpen='!series.closed'
              @clickedEmptyPlayer='goToSeriesTableChange'
              @clickGame='goToEditSelectedGame'
              @newGame='goToNewGame(playerIndex)'
              @selectGame='selectGame'
            />
            <GameDescriptionColumn
              :events='series.events.slice(1, series.events.length)'
              :numberOfPlayers='series.numberOfPlayers'
              :highlightedGameId='selectedGameId'
              :seriesOpen='!series.closed'
              :seriesNotes='series.notes'
              @clickGame='goToEditSelectedGame'
              @newGame='goToNewGame(null)'
              @selectGame='selectGame'
            />
          </div>
        </template>

        <template>
          <div class="spacer"/>
          <SeriesSums
            v-if='series.closed'
            :series='series'
            :expanded='gamesExpanded'
          />
        </template>

        <template v-if="series.numberOfGames > 0">
          <div class="spacer-bigger"/>
          <div class="series-games__secondary-buttons">
            <template v-if='!series.closed && series.isValid'>
              <BigButton
                buttonType='secondary'
                @click='goToSeriesTableChange'
                class="series-games__secondary-button"
              >
                Spielerwechsel
              </BigButton>
              <div class="spacer"/>
            </template>
            <BigButton
              v-if='!series.closed'
              buttonType='secondary'
              @click='closeSeries'
              class="series-games__secondary-button"
            >
              Abrechnen
            </BigButton>
            <BigButton
              v-else
              buttonType='secondary'
              @click='reopenSeries'
              class="series-games__secondary-button"
            >
              Wiederaufmachen
            </BigButton>
          </div>
        </template>
      </template>
      <div class="spacer-big"/>
    </div>
    <MainFooter>
      <BigButton
        v-if='series && !series.closed'
        @click='goToNewGame(null)'
        :disabled='series === null || !series.isValid'
      >
        Spiel eintragen
      </BigButton>
    </MainFooter>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'
import Series from '@/models/series'
import SeriesRequest from '@/api/seriesRequest'
import BackButton from '@/components/BackButton.vue'
import BigButton from '@/components/BigButton.vue'
import GameDescriptionColumn from '@/components/GameDescriptionColumn.vue'
import HeaderButton from '@/components/HeaderButton.vue'
import IconButton from '@/components/IconButton.vue'
import IconHome from '@/assets/IconHome.vue'
import MainFooter from '@/components/MainFooter.vue'
import MainHeader from '@/components/MainHeader.vue'
import ScoreColumn from '@/components/ScoreColumn.vue'
import SeriesSums from '@/components/SeriesSums.vue'
import { localeDate } from '@/filters/index.ts'

@Component({
  components: {
    BackButton,
    BigButton,
    IconButton,
    IconHome,
    GameDescriptionColumn,
    HeaderButton,
    MainFooter,
    MainHeader,
    ScoreColumn,
    SeriesSums
  },
  filters: { localeDate }
})
export default class SeriesGames extends Vue {
  @Action fetchSeries!: (seriesId: number) => void
  @Action fetchSeriesGames!: (seriesId: number) => void
  @Action updateSeries!: (arg: { seriesId: number; params: SeriesRequest }) => void
  @Getter series!: Series | null

  selectedGameId: number | null = null

  get gamesExpanded () {
    return true
    // return (this.series && !this.series.closed) || (this.$route.query && this.$route.query.xpnd === 'true')
  }

  closeSeries () {
    if (this.series === null) { return }
    this.series.closed = true
    this.saveSeries()
    this.$router.replace({ query: { xpnd: 'true' } })
  }

  reopenSeries () {
    if (this.series === null) { return }
    this.series.closed = false
    this.saveSeries()
    this.$router.replace({ query: {} })
  }

  saveSeries () {
    if (this.series === null) { return }
    this.updateSeries({ seriesId: this.routeSeriesId, params: this.series.requestParams })
  }

  // toggleExpandGames () {
  //   this.$router.replace({ query: { xpnd: String(!this.gamesExpanded) } })
  // }

  goToNewGame (playerIndex: number | null) {
    if (this.series === null || !this.series.isValid) { return }
    const baseParams = {
      name: 'newGame',
      params: { seriesId: this.$route.params.seriesId }
    }
    this.$router.push(
      playerIndex === null
        ? baseParams
        : { ...baseParams, query: { playerIndex: playerIndex.toString() } }
    )
  }

  goToHome () {
    this.$router.push({ name: 'home' })
  }

  get routeSeriesId () {
    return parseInt(this.$route.params.seriesId)
  }

  get isSeriesLoaded () {
    return this.series && this.series.id === this.routeSeriesId
  }

  selectGame (id: number | null) {
    this.selectedGameId = id
  }

  goToSeriesTableChange () {
    this.$router.push({ name: 'tableChange', params: this.$route.params })
  }

  goToEditSeries () {
    this.$router.push({ name: 'editSeries', params: this.$route.params })
  }

  goToEditSelectedGame () {
    if (this.selectedGameId === null) { return }
    this.$router.push({
      name: 'editGame',
      params: { seriesId: this.routeSeriesId.toString(), gameId: this.selectedGameId.toString() }
    })
  }

  mounted (): void {
    this.fetchSeries(this.routeSeriesId)
    this.fetchSeriesGames(this.routeSeriesId)
  }
}
</script>

<style scoped lang="stylus">
.series-games
  &__expand
    width 66.7%
    display block
    margin-bottom -8px
    height 32px
    border 0
    border-radius 4px
    background-color #eed

  &__expand-icon
    height 24px

  &__score-area
    display flex

  &__secondary-buttons
    display flex
    flex-direction column
    align-items flex-end

  &__secondary-button
    width 170px
</style>
