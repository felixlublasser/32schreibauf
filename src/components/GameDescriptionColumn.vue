<template>
  <div class="game-column__container">
    <div class="game-column__column game-column__column--thin">
      <div class="game-column__cell game-column__cell--head"/>

      <span
        v-for='game, i in games'
        :key='`value-${game.index}`'
        class="game-column__cell game-column__cell--right-aligned"
        :class='{
          "game-column__cell--last-in-round": (i + 1) % numberOfPlayers === 0
        }'
      >
        {{ game.value }}
      </span>

      <div
        class="game-column__cell game-column__cell--bottom"
        @click='$emit("newGame")'
      />
    </div>

    <div class="game-column__column">
      <div class="game-column__cell game-column__cell--head"/>

      <div
        v-for='game, i in games'
        :key='game.index'
        class="game-column__cell"
        :class='{
          "game-column__cell--last-in-round": (i + 1) % numberOfPlayers === 0
        }'
      >
        <Interpolator
          :string='game.description'
          class="game-column__description"
        >
          <i slot='text' slot-scope='{ text }'>{{ text }}</i>
          <b slot='bold' slot-scope='{ text }'>{{ text }}</b>
          <i slot='superscript' class='game-column__with' slot-scope='{ text }'>{{ text }}</i>
          <i slot='subscript' class='game-column__without' slot-scope='{ text }'>{{ text }}</i>
          <span slot='suit' slot-scope='{ text }' class='game-column__suit'>{{ text }}</span>
        </Interpolator>
      </div>

      <div
        class="game-column__cell game-column__cell--bottom"
        @click='$emit("newGame")'
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Game from '@/models/game'
import Interpolator from '@/components/Interpolator.vue'

@Component({ components: { Interpolator } })
export default class GameDescriptionColumn extends Vue {
  @Prop(Array) private games!: Game[]
  @Prop(Number) private numberOfPlayers!: number
}
</script>

<style scoped lang="stylus">
.game-column
  &__container
    flex-grow 3
    display flex
    border-left 2px solid #333
    width 1px

  &__column
    display flex
    flex-direction column
    align-items stretch
    flex-grow 1

    &--thin
      max-width 60px

  &__cell
    height 32px
    line-height 32px
    border-bottom 1px solid #eee

    &--head
      background-color #f5f5f5
      border-bottom 2px solid #333

    &--last-in-round
      border-bottom-color #999

    &--bottom
      border-bottom none

    &--right-aligned
      text-align right

  &__value
    margin 0

  &__suit
    font-size 20px

  &__with
    font-size 12px
    align-self flex-start
    margin-top -3px

  &__without
    font-size 12px
    align-self flex-end
    margin-bottom -5px
    margin-left -2px
</style>
