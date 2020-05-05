<template>
  <div class="player-sprite" @click='$emit("click")'>
    <div
      class="player-sprite__sprite"
      :class='{ "player-sprite__sprite--empty": !player, "player-sprite__sprite--slotted": player && slotted }'
    >
      {{ player ? player.name.slice(0, 1) : '' }}
    </div>
    <slot name='name' :playerName='player ? player.name : null' />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import PlayerInterf from '@/models/playerInterf'

@Component
export default class PlayerSprite extends Vue {
  @Prop(Object) player!: PlayerInterf
  @Prop(Boolean) slotted!: boolean
}
</script>

<style scoped lang="stylus">
.player-sprite
  display flex
  flex-direction column
  align-items center
  cursor pointer
  padding-top 8px

  &__sprite
    border-style solid
    border-color #999
    background-color #eee
    border-radius 8px
    width 48px
    height 48px
    font-size 32px
    font-weight bold
    line-height 48px
    border-width 1px 3px 3px 1px

    &--empty
      background-color #ccc
      border-color #aaa
      border-width 3px 0 0 3px
      width 47px
      height 47px

    &--slotted
      border-width 1px
</style>
