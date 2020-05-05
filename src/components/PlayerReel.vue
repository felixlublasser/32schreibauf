<template>
  <div class="player-reel">
    <div class="player-reel__sprites-container">
      <div
        v-for='player in players'
        :key='player.id'
        class="player-reel__sprite"
        :class='{ "player-reel__sprite--hidden": draggedPlayer && draggedPlayer.id === player.id }'
        @touchstart='startSpriteDrag($event, player)'
        @touchmove='dragSprite'
        @touchend='dropSprite(player)'
      >
        <PlayerSprite :player='player'>
          <span
            slot='name'
            slot-scope='{ playerName }'
            class="player-reel__player-name"
          >{{ playerName || '' }}</span>
        </PlayerSprite>
      </div>
    </div>

    <div class="player-reel__sidebar">
      <div class="spacer"/>
      <div class="stack-horizontal">
        <div class="spacer"/>
        <IconButton icon='plus' @click='goToNewPlayer'/>
        <div class="spacer"/>
      </div>
    </div>

    <PlayerSprite v-show='draggedPlayer'
      :player='draggedPlayer'
      class="player-reel__ghost-sprite"
      ref='ghost'
    >
      <span
        slot='name'
        slot-scope='{ playerName }'
        class="player-reel__player-name"
      >{{ playerName || '' }}</span>
    </PlayerSprite>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Player from '@/models/player'
import PlayerSprite from '@/components/PlayerSprite.vue'
import IconButton from '@/components/IconButton.vue'
import { Area } from '@/models/utils'
import { areasOverlap } from '@/helpers'

@Component({ components: { IconButton, PlayerSprite } })
export default class PlayerReel extends Vue {
  @Prop(Array) players!: Player[]
  @Prop(Array) dropAreas!: Element[]

  draggedPlayer: Player | null = null
  dragStart: { x: number; y: number } | null = null
  dragOffset: { x: number; y: number } | null = null

  $refs!: { ghost: Vue }

  startSpriteDrag (event: TouchEvent, player: Player) {
    const currentTarget = event.currentTarget as HTMLFormElement
    if (!currentTarget || !currentTarget.firstElementChild) { return }

    this.draggedPlayer = player
    const touch = event.changedTouches[0]
    this.dragStart = { x: touch.clientX, y: touch.clientY }
    const child = (currentTarget as HTMLFormElement).firstElementChild as HTMLFormElement
    const playerSpotPosition = child.getBoundingClientRect()
    this.dragOffset = { x: touch.clientX - playerSpotPosition.left, y: touch.clientY - playerSpotPosition.top }
    this.ghostSprite.style.left = playerSpotPosition.left + 'px'
    this.ghostSprite.style.top = playerSpotPosition.top + 'px'
  }

  dragSprite (event: TouchEvent) {
    if (!this.dragOffset) { return }
    const touch = event.changedTouches[0]
    this.ghostSprite.style.left = (touch.clientX - this.dragOffset.x) + 'px'
    this.ghostSprite.style.top = (touch.clientY - this.dragOffset.y) + 'px'
  }

  dropSprite (player: Player) {
    const { top, left, bottom, right } = this.ghostSprite.getBoundingClientRect()
    const spriteArea: Area = { top, left, bottom, right }
    const dropAreaIndex = this.dropAreas.findIndex((dropArea) => {
      return areasOverlap(spriteArea, dropArea.getBoundingClientRect())
    })
    if (dropAreaIndex !== -1) {
      this.$emit('dropInArea', dropAreaIndex, player)
    }
    this.draggedPlayer = null
  }

  get ghostSprite () {
    return (this.$refs.ghost as Vue).$el as HTMLFormElement
  }

  goToNewPlayer () {
    this.$router.push({ name: 'newPlayer' })
  }

  mounted () {
    this.$emit('mounted')
  }
}
</script>

<style scoped lang="stylus">
.player-reel
  background-color #eee
  border-radius 8px
  white-space nowrap
  display flex
  max-height 200px
  display flex

  &__sprites-container
    padding 8px
    display flex
    align-items center
    flex-wrap wrap
    justify-content space-between
    overflow-y scroll

  &__sprite
    display inline-block
    min-width 66px

    &--hidden
      visibility hidden

  &__ghost-sprite
    position absolute

  &__player-name
    height 24px

  &__sidebar
    display flex
    flex-direction column
    background-color #ccc
    border-radius 0 8px 8px 0
</style>
