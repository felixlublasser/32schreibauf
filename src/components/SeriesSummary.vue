<template>
  <div class="series-summary" @touchend='$emit("select", series.id)'>
    <button
      @touchend='handleDelete'
      class="series-summary__flat-button series-summary__flat-button--delete"
      ref='deleteButton'
    >
      <IconBin class="series-summary__trash-can"/>
    </button>

    <div
      class="series-summary__container"
      :class='{
        "series-summary__container--highlighted": highlighted,
        "series-summary__container--swiping": offset
      }'
      @touchstart='startTouch'
      @touchmove='swipe'
      @touchend='stopTouch'
    >
      <div class="stack-horizontal">
        <div class="spacer"/>
        <p class="series-summary__datum series-summary__datum--date">{{ series.date | localeDate }}</p>
        <div class="spacer"/>
        <p class="series-summary__datum series-summary__datum--names">{{ playerNames }}</p>
      </div>
      <div class="stack-horizontal">
        <p class="series-summary__datum">{{ numberOfGamesFormatted }}</p>
        <div class="spacer"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Series from '@/models/series'
import { localeDate } from '@/filters/index.ts'
import IconBin from '@/assets/IconBin.vue'

@Component({ components: { IconBin }, filters: { localeDate } })
export default class SeriesSummary extends Vue {
  @Prop(Series) private series!: Series

  swipeOffset: number | null = null
  swiping = false
  highlighted = false
  offset = false

  private get playerNames (): string {
    return this.series.allPlayers.map(p => p && p.name).join(', ') || 'bisher niemand'
  }

  startTouch (event: TouchEvent) {
    const currentTarget = event.currentTarget as HTMLFormElement
    if (!currentTarget) { return }
    const touchX = event.changedTouches[0].clientX
    const containerPosition = currentTarget.getBoundingClientRect()
    this.swipeOffset = touchX - containerPosition.left
    this.highlighted = true
  }

  startSwipe (element: HTMLFormElement, boundingRect: DOMRect) {
    element.style.top = boundingRect.top + 'px'
    element.style.width = boundingRect.width + 'px'
    this.deleteButton.classList.add('series-summary__flat-button--visible')
    this.offset = true
    this.swiping = true
  }

  swipe (event: TouchEvent) {
    const currentTarget = event.currentTarget as HTMLFormElement
    if (!currentTarget || !this.swipeOffset) { return }
    if (!this.swiping) {
      this.startSwipe(currentTarget, currentTarget.getBoundingClientRect())
    }
    const newLeft = Math.max(-10, Math.min(66, event.changedTouches[0].clientX - this.swipeOffset))
    currentTarget.style.left = newLeft + 'px'
    currentTarget.style.width = `calc(100% - ${newLeft + 8}px)`
    this.deleteButton.style.width = Math.min(Math.max(0, newLeft - 8), 40) + 'px'
  }

  stopTouch (event: TouchEvent) {
    if (!this.swiping) { return }
    const currentTarget = event.currentTarget as HTMLFormElement
    if (!currentTarget) { return }

    currentTarget.style.width = '100%'
    if (currentTarget.getBoundingClientRect().left >= 48) {
      currentTarget.style.left = '48px'
      currentTarget.style.width = 'calc(100% - 56px)'
      this.deleteButton.style.width = '40px'
    } else {
      this.deleteButton.classList.remove('series-summary__flat-button--visible')
      this.deleteButton.style.width = '0px'
      this.offset = false
      this.highlighted = false
      currentTarget.style.width = '100%'
    }
    event.stopPropagation()
    this.swiping = false
  }

  handleDelete (event: TouchEvent) {
    event.stopPropagation()
    this.$emit('delete', this.series)
  }

  get numberOfGamesFormatted () {
    return this.series.numberOfGames + (this.series.numberOfGames === 1 ? ' Spiel' : ' Spiele')
  }

  get deleteButton () {
    return this.$refs.deleteButton as HTMLFormElement
  }
}
</script>

<style scoped lang="stylus">
.series-summary
  height 40px
  display flex

  &:not(:last-child)
    border-bottom 1px solid #999

  &__container
    display flex
    flex-direction row
    height 40px
    align-items center
    justify-content space-between
    width 100%

    &--swiping
      position absolute

    &--highlighted
      background-color #eee

  &__datum
    margin 0

    &--date
      width 81px

    &--names
      white-space nowrap
      overflow hidden
      text-overflow ellipsis
      max-width calc(100vw - 81px - 40px - 75px)

  &__button-container
    display flex

  &__flat-button
    padding 0
    border none
    display none
    height 100%
    width 0

    &--visible
      display block

    &--delete
      background-color #e44

  &__trash-can
    height 20px
    width 20px
    fill white
</style>
