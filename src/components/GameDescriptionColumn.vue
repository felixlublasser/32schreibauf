<template>
  <div class="game-column__container">
    <div
      class="game-column__cell game-column__cell--head game-column__cell--notes"
      @touchend='goToEditSeries'
    >
      {{ seriesNotes }}
    </div>
    <div class="stack-horizontal">
      <div class="game-column__column game-column__column--thin">
        <template v-for='event in events'>
          <div
            v-if='isTableChange(event)'
            :key='event.eventIndex'
            class="game-column__cell game-column__cell--sub-head"
          />

          <span
            v-else
            :key='`value-${event.eventIndex}`'
            class="game-column__cell game-column__cell--right-aligned"
            :class='{
              "game-column__cell--last-in-round": (event.index + 1) % numberOfPlayers === 0,
              "game-column__cell--highlighted": highlightedGameId === event.id
            }'
            @touchstart='touchStartGame(event.id)'
            @touchmove='swipe'
            @touchend='releaseGame'
          >
            {{ event.value || '-' }}
          </span>
        </template>

        <div
          v-if='seriesOpen'
          class="game-column__cell game-column__cell--bottom"
          @click='$emit("newGame")'
        />
      </div>

      <div class="game-column__column">
        <template v-for='event in events'>
          <div
            v-if='isTableChange(event)'
            :key='event.eventIndex'
            class="game-column__cell game-column__cell--sub-head"
          />

          <div
            v-else
            :key='`descr-${event.eventIndex}`'
            class="game-column__cell game-column__description-container"
            :class='{
              "game-column__cell--last-in-round": (event.index + 1) % numberOfPlayers === 0,
              "game-column__cell--highlighted": highlightedGameId === event.id
            }'
            @touchstart='touchStartGame(event.id)'
            @touchmove='swipe'
            @touchend='releaseGame'
          >
            <div class="game-column__flex-spacer"/>
            <Interpolator
              :string='event.description'
              class="game-column__description"
            >
              <i slot='text' slot-scope='{ text }'>{{ text }}</i>
              <b slot='bold' slot-scope='{ text }'>{{ text }}</b>
              <i slot='superscript' class='game-column__with' slot-scope='{ text }'>{{ text }}</i>
              <i slot='subscript' class='game-column__without' slot-scope='{ text }'>{{ text }}</i>
              <Icon slot='icon' :icon='icon' slot-scope='{ icon }' class='game-column__suit'/>
            </Interpolator>
          </div>
        </template>

        <div
          v-if='seriesOpen'
          class="game-column__cell game-column__cell--bottom"
          @click='$emit("newGame")'
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Game from '@/models/games/game'
import Interpolator from '@/components/Interpolator.vue'
import TableChange from '@/models/tableChange'
import SeriesEvent from '@/models/seriesEvent'
import SeriesEventType from '@/models/seriesEventType'
import Icon from '@/components/Icon.vue'

@Component({ components: { Icon, Interpolator } })
export default class GameDescriptionColumn extends Vue {
  @Prop(Array) private events!: (Game | TableChange)[]
  @Prop(Number) private numberOfPlayers!: number
  @Prop(Number) private highlightedGameId!: number | null
  @Prop(Boolean) private seriesOpen!: boolean
  @Prop(String) private seriesNotes!: string | null

  swiping = false

  isTableChange (event: SeriesEvent) {
    return event.eventType === SeriesEventType.tableChange
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

  goToEditSeries () {
    this.$router.push({ name: 'editSeries', params: this.$route.params })
  }
}
</script>

<style scoped lang="stylus">
.game-column
  &__container
    flex-grow 3
    display flex
    border-left 2px solid #333
    width 1px
    flex-direction column

  &__column
    display flex
    flex-direction column
    align-items stretch
    flex-grow 1
    overflow hidden

    &--thin
      max-width 60px
      min-width 36px

  &__description-container
    display flex
    align-items center
    height 100%

  &__description
    display flex
    align-items center
    justify-content flex-start
    height 100%

  &__cell
    height 32px
    line-height 32px
    border-bottom 1px solid #eee

    &--head
      background-color #f5f5f5
      border-bottom 2px solid #333
      position sticky
      top 0

    &--sub-head
      background-color #f5f5f5
      border-bottom 2px solid #333
      top 0

    &--last-in-round
      border-bottom-color #999

    &--bottom
      border-bottom none

    &--right-aligned
      text-align right
      padding-left 4px

    &--highlighted
      background-color #8e8

    &--cta
      background-color #3c3
      color white
      font-weight bold

    &--notes
      overflow hidden
      white-space nowrap
      text-overflow ellipsis
      font-size 14px

  &__value
    margin 0

  &__suit
    height 16px

  &__with
    font-size 12px
    align-self flex-start
    line-height 24px

  &__without
    font-size 12px
    align-self flex-end
    line-height 24px

  &__flex-spacer
    max-width 16px
    flex-basis 16px
</style>
