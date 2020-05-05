<template>
  <div>
    <MainHeader>
      <BackButton slot='left' @click='goToHome'/>
      <template v-if='isSeriesLoaded' slot='title'>{{ series.date }}</template>
    </MainHeader>
    <div v-if='isSeriesLoaded' class="view">
      <!-- <SeriesHeader :series='series'/> -->
      <template v-if='series.games'>
        <template v-if='gamesExpanded'>
          <div class="series-games__score-area">
            <ScoreColumn
              v-for='_, playerIndex in series.numberOfPlayers'
              :key='`column-${playerIndex}`'
              :games='series.games'
              :player='series.players[playerIndex]'
              :playerIndex='playerIndex'
              :numberOfPlayers='series.numberOfPlayers'
              @newGame='goToNewGame(playerIndex)'
            />
            <GameDescriptionColumn
              :games='series.games'
              :numberOfPlayers='series.numberOfPlayers'
              @newGame='goToNewGame(null)'
            />
          </div>
        </template>

        <template v-if='series.closed' >
          <button
            @click='toggleExpandGames'
            class="series-games__expand"
          >
            <img src='@/assets/logo.png' class="series-games__expand-icon">
          </button>
          <SeriesSums
            :series='series'
            :expanded='gamesExpanded'
          />
          <button @click='reopenSeries' class="series-games__button">
            Wieder aufmachen
          </button>
        </template>

        <template v-else>
          <div class="spacer-big"/>
          <BigButton @click='goToNewGame(null)'>
            Spiel eintragen
          </BigButton>
        </template>
      </template>
    </div>
    <MainFooter>
      <IconButton v-if="series && !series.closed" icon='check' text='Abrechnen' @click='closeSeries' />
    </MainFooter>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'
import Series from '@/models/series'
import SeriesHeader from '@/components/SeriesHeader.vue'
import SeriesSums from '@/components/SeriesSums.vue'
import SeriesUpdateRequest from '@/api/SeriesUpdateRequest'
import MainFooter from '@/components/MainFooter.vue'
import IconButton from '@/components/IconButton.vue'
import MainHeader from '@/components/MainHeader.vue'
import BackButton from '@/components/BackButton.vue'
import BigButton from '@/components/BigButton.vue'
import ScoreColumn from '@/components/ScoreColumn.vue'
import GameDescriptionColumn from '@/components/GameDescriptionColumn.vue'

@Component({
  components: {
    BackButton,
    BigButton,
    IconButton,
    GameDescriptionColumn,
    MainFooter,
    MainHeader,
    ScoreColumn,
    SeriesHeader,
    SeriesSums
  }
})
export default class SeriesGames extends Vue {
  @Action fetchSeries!: (seriesId: number) => void
  @Action fetchSeriesGames!: (seriesId: number) => void
  @Action updateSeries!: (arg: { seriesId: number; params: SeriesUpdateRequest }) => void
  @Getter series!: Series | null

  get gamesExpanded () {
    return (this.series && !this.series.closed) || (this.$route.query && this.$route.query.xpnd === 'true')
  }

  closeSeries () {
    this.updateSeries({ seriesId: this.routeSeriesId, params: { closed: true } })
    this.$router.replace({ query: { xpnd: 'true' } })
  }

  reopenSeries () {
    this.updateSeries({ seriesId: this.routeSeriesId, params: { closed: false } })
    this.$router.replace({ query: {} })
  }

  toggleExpandGames () {
    this.$router.replace({ query: { xpnd: String(!this.gamesExpanded) } })
  }

  goToGame (playerIndex: number | null) {
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
</style>
