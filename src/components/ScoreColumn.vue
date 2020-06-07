<template>
  <div class="score-column">
    <template
      v-for='event in events'
    >
      <div
        :key='event.eventIndex'
        v-if='isTableChange(event)'
        class="score-column__cell score-column__cell--head"
        :class='{
          "score-column__cell--left": playerIndex === 0,
          "score-column__cell--head--empty": playerName(event) === ""
        }'
        @click='clickedPlayer'
      >
        {{ playerName(event) }}
      </div>

      <div
        v-else
        :key='event.eventIndex'
        class="score-column__cell score-column__cell--score"
        :class='{
          "score-column__cell--left": playerIndex === 0,
          "score-column__cell--last-in-round": (event.index + 1) % numberOfPlayers === 0,
          "score-column__cell--highlighted": highlightedGameId === event.id && event.playerIndexTakesPart(playerIndex),
          "score-column__cell--not-playing": !event.playerIndexTakesPart(playerIndex) && highlightedGameId !== event.id,
          "score-column__cell--highlighted-and-not-playing": !event.playerIndexTakesPart(playerIndex) && highlightedGameId === event.id
        }'
        @touchstart='touchStartGame(event.id)'
        @touchmove='swipe'
        @touchend='releaseGame'
      >
        {{ scoreStringFor(event) }}
      </div>
    </template>

    <div
      v-if='seriesOpen'
      class="score-column__cell score-column__cell--bottom"
      :class='{
        "score-column__cell--left": playerIndex === 0,
        "score-column__cell--not-playing": !playerParticipatesInNextGame
      }'
      @click='$emit("newGame")'
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Game from '@/models/games/game'
import TableChange from '@/models/tableChange'
import GamesCollection from '@/models/gamesCollection'
import SeriesEvent from '@/models/seriesEvent'
import SeriesEventType from '@/models/seriesEventType'

@Component
export default class ScoreColumn extends Vue {
  @Prop(Array) private events!: (Game | TableChange)[]
  @Prop(Number) private playerIndex!: number
  @Prop(Number) private numberOfPlayers!: number
  @Prop(Number) private highlightedGameId!: number | null
  @Prop(Boolean) private seriesOpen!: boolean
  @Prop(Boolean) private playerParticipatesInNextGame!: boolean

  swiping = false

  scoreStringFor (game: Game) {
    if (!game.playerIndexTakesPart(this.playerIndex)) {
      return ''
    }
    if (!game.playerIndexReceivesPoints(this.playerIndex)) {
      return '-'
    }
    return game.isTestGame ? '-*' : this.totalForPlayerIndexForGame(game)
  }

  totalForPlayerIndexForGame (game: Game) {
    return this.gamesUpTo(game).totalForPlayerIndex(this.playerIndex)
  }

  get gamesCollection () {
    return new GamesCollection(this.events.filter(e => e.eventType === SeriesEventType.game) as Game[])
  }

  playerName (tableChange: TableChange) {
    const p = tableChange.table[this.playerIndex]
    const previousTable = this.previousTable(tableChange)
    if (previousTable === null) { return p === null ? '?' : p.name }
    if (previousTable.table[this.playerIndex] === null) { return p && p.name }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return (previousTable.table[this.playerIndex]!.id === (p && p.id))
      ? ''
      : (p && p.name)
  }

  previousTable (tableChange: TableChange) {
    const previousTableChanges = this.events.filter(e => {
      return e.eventType === SeriesEventType.tableChange && e.eventIndex < tableChange.eventIndex
    }) as TableChange[]
    return previousTableChanges.length > 0
      ? previousTableChanges[previousTableChanges.length - 1]
      : null
  }

  gamesUpTo (game: Game) {
    return this.gamesCollection.slice(game.index)
  }

  isTableChange (event: SeriesEvent) {
    return event.eventType === SeriesEventType.tableChange
  }

  clickedPlayer () {
    if ((this.events[0] as TableChange).table[this.playerIndex] === null) {
      this.$emit('clickedEmptyPlayer')
    }
  }

  touchStartGame (gameId: number) {
    this.$emit('selectGame', gameId)
  }

  swipe () {
    this.swiping = true
  }

  releaseGame () {
    if (this.swiping) {
      this.swiping = false
      this.$emit('selectGame', null)
      return
    }
    this.$emit('clickGame')
  }
}
</script>

<style scoped lang="stylus">
.score-column
  display flex
  flex-direction column
  align-items stretch
  flex-grow 2
  width 1px

  &__cell
    height 32px
    line-height 32px
    border-left 1px solid #999

    &--score
      border-bottom 1px solid #eee

    &--head
      font-weight bold
      background-color #f5f5f5
      border-bottom 2px solid #333
      position sticky
      top 0

      &--empty
        position unset

    &--left
      border-left none

    &--last-in-round
      border-bottom-color #999

    &--bottom
      border-bottom none

    &--highlighted
      background-color #8e8

    &--not-playing
      background-color #ddd

    &--highlighted-and-not-playing
      background-color #7b7
</style>
