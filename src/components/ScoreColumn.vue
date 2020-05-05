<template>
  <div class="score-column">
    <div
      class="score-column__cell score-column__cell--head"
      :class='{"score-column__cell--left": playerIndex === 0}'
    >
      {{ player.name }}
    </div>
    <div
      v-for='game, i in gamesCollection.games'
      :key='game.index'
      class="score-column__cell score-column__cell--score"
      :class='{
        "score-column__cell--left": playerIndex === 0,
        "score-column__cell--last-in-round": (i + 1) % numberOfPlayers === 0
      }'
    >
      {{ scoreStringFor(game) }}
    </div>
    <div
      class="score-column__cell score-column__cell--bottom"
      :class='{"score-column__cell--left": playerIndex === 0}'
      @click='$emit("newGame")'
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Player from '@/models/player'
import Game from '@/models/game'
import GamesCollection from '@/models/gamesCollection'

@Component
export default class ScoreColumn extends Vue {
  @Prop(Array) private games!: Game[]
  @Prop(Player) private player!: Player
  @Prop(Number) private playerIndex!: number
  @Prop(Number) private numberOfPlayers!: number

  scoreStringFor (game: Game) {
    return game.playerIndexReceivesPoints(this.playerIndex, this.numberOfPlayers)
      ? this.totalForPlayerIndexForGame(game)
      : '-'
  }

  totalForPlayerIndexForGame (game: Game) {
    return this.gamesUpTo(game).totalForPlayerIndex(this.playerIndex, this.numberOfPlayers)
  }

  get gamesCollection () {
    return new GamesCollection(this.games)
  }

  gamesUpTo (game: Game) {
    return this.gamesCollection.slice(game.index)
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

    &--left
      border-left none

    &--last-in-round
      border-bottom-color #999

    &--bottom
      border-bottom none
</style>
