<template>
  <div class="player-cadre">
    <div
      v-for='(selectedPlayer, i) in value'
      :key='playerKeys[i]'
      class="player-cadre__seat"
    >
      <div class="player-cadre__seat-label">
        {{ seatLabels[i] }}
      </div>
      <div
        class='player-cadre__player-seat-container'
        @touchstart='startSeatDrag'
        @touchmove='dragSeat($event, i)'
        @touchend='dropSeat'
        :ref='`player-seat-${i}`'
      >
        <div class='player-cadre__player-seat-movable'>
          <div class='player-cadre__player-seat'>
            <div class='player-cadre__player-seat-anchor'/>
            <div
              class='player-cadre__player-sprite-movable'
              @touchstart='startSpriteDrag($event, i)'
              @touchmove='dragSprite'
              @touchend='dropSprite'
            >
              <PlayerSprite
                :player='i === draggedSpriteIndex ? null : selectedPlayer'
                :slotted='true'
              />
            </div>
          </div>
          <span class="player-cadre__player-name">
            {{ (i !== draggedSpriteIndex) && selectedPlayer  && selectedPlayer.name || '' }}
          </span>
        </div>
      </div>
    </div>

    <SwitchButtons v-if='allowChangeOfPlayerNumber' v-model='threePlayerTable'>
      <span slot="true" class="label-big">3</span>
      <span slot="false" class="label-big">4</span>
    </SwitchButtons>

    <PlayerSprite v-show='draggedSpriteIndex !== null'
      :player='value[draggedSpriteIndex]'
      class="player-cadre__ghost-sprite"
      ref='ghost'
    >
      <span
        slot='name'
        slot-scope='{ playerName }'
        class="player-cadre__player-name"
      >{{ playerName || '' }}</span>
    </PlayerSprite>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Player from '@/models/player'
import PlayerSprite from '@/components/PlayerSprite.vue'
import IconButton from '@/components/IconButton.vue'
import SwitchButtons from '@/components/SwitchButtons.vue'
import { areasOverlap } from '@/helpers'
import { Area } from '@/models/utils'

@Component({
  components: { IconButton, PlayerSprite, SwitchButtons }
})
export default class PlayerCadre extends Vue {
  @Prop(Array) value!: (Player | null)[]
  @Prop(DOMRect) deleteArea!: Area | null
  @Prop(Boolean) allowChangeOfPlayerNumber!: boolean

  playerKeys = [0, 1, 2]
  touchStartedAt: { dx: number; dy: number; x: number; y: number } | null = null
  seatElements: Element[] = []

  draggedSpriteIndex: (number | null) = null
  dragSpriteStart: { x: number; y: number } | null = null
  dragSpriteOffset: { x: number; y: number } | null = null

  get seatLabels () {
    return ['Geber', 'VH', 'MH', 'HH', 'Kiebitz']
  }

  get threePlayerTable () {
    return this.value.length === 3
  }

  set threePlayerTable (v: boolean) {
    if (v && !this.threePlayerTable) {
      this.removePlayer()
    } else if (!v && this.threePlayerTable) {
      this.addPlayer()
    }
  }

  startSeatDrag (event: TouchEvent) {
    if (!event.target || !event.changedTouches) { return }
    const target = (event.target as HTMLFormElement)
    if (target.classList.contains('player-sprite__sprite')) {
      return
    }
    const currentTarget = (event.currentTarget as HTMLFormElement)
    if (!currentTarget || !currentTarget.firstElementChild) { return }
    const playerSpotPosition = currentTarget.firstElementChild.getBoundingClientRect()
    const touch = event.changedTouches[0]
    this.touchStartedAt = {
      x: touch.clientX,
      y: touch.clientY,
      dx: touch.clientX - playerSpotPosition.left,
      dy: touch.clientY - playerSpotPosition.top
    }
  }

  dragSeat (event: TouchEvent, playerIndex: number) {
    if (!event.target || !event.currentTarget) { return }
    if ((event.target as HTMLFormElement).classList.contains('player-sprite__sprite')) {
      return
    }
    const playerSpot = event.currentTarget as HTMLFormElement
    const playerSprite = playerSpot.firstElementChild as HTMLFormElement
    if (!playerSprite) { return }
    playerSprite.classList.add('player-cadre__player-seat--dragging')

    const touch = event.changedTouches[0]
    if (!this.touchStartedAt) { return }
    const leftEdge = touch.clientX - this.touchStartedAt.dx
    const topEdge = touch.clientY - this.touchStartedAt.dy
    playerSprite.style.left = leftEdge + 'px'
    playerSprite.style.top = topEdge + 'px'

    if (playerIndex > 0 && leftEdge < this.playerCenterlines[playerIndex - 1]) {
      this.switchPlayers(playerIndex, playerIndex - 1)
    }
    const rightEdge = playerSprite.getBoundingClientRect().right
    if ((playerIndex + 1 < this.numberOfPlayers) && (rightEdge > this.playerCenterlines[playerIndex + 1])) {
      this.switchPlayers(playerIndex, playerIndex + 1)
    }
  }

  dropSeat (event: TouchEvent) {
    const playerSpot = event.currentTarget as HTMLFormElement
    if (!playerSpot || !playerSpot.firstElementChild) { return }
    const child = playerSpot.firstElementChild as HTMLFormElement
    child.classList.remove('player-cadre__player-seat--dragging')
    this.touchStartedAt = null
  }

  async switchPlayers (i: number, j: number) {
    const selectedPlayers = this.value.map(x => x)
    const buffer = selectedPlayers[i]
    selectedPlayers[i] = selectedPlayers[j]
    selectedPlayers[j] = buffer
    this.$emit('input', selectedPlayers)
    const buffer2 = this.playerKeys[i]
    this.$set(this.playerKeys, i, this.playerKeys[j])
    this.$set(this.playerKeys, j, buffer2)
    await this.$nextTick()
    this.calcSeatElements()
  }

  calcSeatElements () {
    const array = Array(this.numberOfPlayers).fill(0).map((_, i): (Element | null) => {
      const seats = this.$refs[`player-seat-${i}`] as Element[]
      if (!seats) { return null }
      const seat = seats[0]
      return seat ? seat.firstElementChild : null
    })
    this.seatElements = array.filter((x): x is Element => x !== null)
  }

  get playerCenterlines () {
    return this.playerBoundingRects.map(r => (r.right + r.left) / 2)
  }

  get playerBoundingRects () {
    return this.seatElements.map(e => e.getBoundingClientRect())
  }

  get numberOfPlayers () {
    return this.value.length
  }

  startSpriteDrag (event: TouchEvent, seatIndex: number) {
    if (!event.currentTarget || this.value[seatIndex] === null) { return }
    this.draggedSpriteIndex = seatIndex
    const touch = event.changedTouches[0]
    this.dragSpriteStart = { x: touch.clientX, y: touch.clientY }
    const currentTarget = event.currentTarget as HTMLFormElement
    const playerSpotPosition = currentTarget.getBoundingClientRect()
    this.dragSpriteOffset = { x: touch.clientX - playerSpotPosition.left, y: touch.clientY - playerSpotPosition.top }

    this.ghostSprite.style.left = playerSpotPosition.left + 'px'
    this.ghostSprite.style.top = playerSpotPosition.top + 'px'
  }

  dragSprite (event: TouchEvent) {
    if (!this.dragSpriteOffset || this.draggedSpriteIndex === null) { return }
    const touch = event.changedTouches[0]
    this.ghostSprite.style.left = (touch.clientX - this.dragSpriteOffset.x) + 'px'
    this.ghostSprite.style.top = (touch.clientY - this.dragSpriteOffset.y) + 'px'
  }

  dropSprite () {
    if (this.draggedSpriteIndex === null) { return }
    const { top, left, bottom, right } = this.ghostSprite.getBoundingClientRect()
    const spriteArea: Area = { top, left, bottom, right }
    const dropAreaIndex = this.playerBoundingRects.findIndex((dropArea: Area) => {
      return areasOverlap(spriteArea, dropArea)
    })
    if (dropAreaIndex !== -1) {
      this.dropSpriteInSeat(dropAreaIndex, this.draggedSpriteIndex || 0)
    } else if (this.deleteArea && areasOverlap(spriteArea, this.deleteArea)) {
      this.deselectPlayer(this.draggedSpriteIndex)
    }
    this.draggedSpriteIndex = null
  }

  dropSpriteInSeat (seatIndex: number, draggedSpriteSeatIndex: number) {
    const selectedPlayers = this.value.map(x => x)
    if (selectedPlayers[seatIndex] !== null) { return }

    selectedPlayers[seatIndex] = this.value[draggedSpriteSeatIndex]
    selectedPlayers[draggedSpriteSeatIndex] = null
    this.$emit('input', selectedPlayers)
  }

  deselectPlayer (seatIndex: number) {
    const selectedPlayers = this.value.map(x => x)
    selectedPlayers[seatIndex] = null
    this.$emit('input', selectedPlayers)
  }

  get ghostSprite () {
    return (this.$refs.ghost as Vue).$el as HTMLFormElement
  }

  async addPlayer () {
    const selectedPlayers = this.value.map(x => x)

    this.$set(this.playerKeys, selectedPlayers.length, Math.max(...this.playerKeys) + 1)

    selectedPlayers[selectedPlayers.length] = null
    this.$emit('input', selectedPlayers)
    await this.$nextTick()
    this.calcSeatElements()
  }

  async removePlayer () {
    const selectedPlayers = this.value.map(x => x)
    selectedPlayers.splice(selectedPlayers.length - 1, 1)
    this.$emit('input', selectedPlayers)
    this.playerKeys.splice(this.playerKeys.length - 1, 1)
    await this.$nextTick()
    this.calcSeatElements()
  }

  async mounted () {
    this.calcSeatElements()
    this.$emit('mounted')
  }
}
</script>

<style scoped lang="stylus">
.player-cadre
  display flex
  justify-content flex-start
  align-items center

  &__seat
    display flex
    flex-direction column
    align-items center
    flex-grow 1

  &__seat-label
    font-weight bold

  &__player-seat-container
    width 50px
    flex-grow 1
    display flex
    align-items center
    flex-direction column
    margin-top 0
    cursor pointer

  &__player-seat
    background-color #333
    padding-bottom 8px
    display flex
    flex-direction column
    justify-content space-between
    border-radius 8px
    min-width 58px
    min-height 88px

    &--dragging
      position absolute

  &__player-seat-anchor
    height 4px
    margin 6px 8px
    border-radius 8px
    background-color #999

  &__player-name
    height 24px
    display block

  &__add-player
    margin 24px 0 40px 0
    flex-grow 1
    width 32px
    max-width 40px

  &__ghost-sprite
    position absolute
</style>
