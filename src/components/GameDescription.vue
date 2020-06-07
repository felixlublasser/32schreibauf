<template>
  <div class="game-description__container">
    <template v-if='game !== null'>
      <Interpolator :string='game.description' class="game-description__description">
        <i slot='text' slot-scope='{ text }' class='label-big'>{{ text }}</i>
        <b slot='bold' slot-scope='{ text }' class='label-big'>{{ text }}</b>
        <i slot='superscript' slot-scope='{ text }' class='game-description__with'>{{ text }}</i>
        <i slot='subscript' slot-scope='{ text }' class='game-description__without'>{{ text }}</i>
        <Icon slot='icon' :icon='icon' slot-scope='{ icon }' class='game-description__suit'/>
      </Interpolator>
      <div class='spacer-big'/>
      <span class='label-big'>{{ game.totalValue }}</span>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Icon from '@/components/Icon.vue'
import Interpolator from '@/components/Interpolator.vue'
import Game from '@/models/games/game'

@Component({ components: { Icon, Interpolator } })
export default class GameDescription extends Vue {
  @Prop(Object) private game!: Game | null
}
</script>

<style scoped lang="stylus">
.game-description
  &__container
    display flex
    flex-direction row
    justify-content center
    align-items center
    background-color #eee
    border-radius 8px
    padding 0 8px
    height 40px

  &__description
    display flex
    align-items center
    justify-content center

  &__suit
    height 24px
    width 24px
    stroke-width 0px

  &__with
    font-size 20px
    align-self flex-start
    line-height 16px

  &__without
    font-size 20px
    align-self flex-end
    line-height 12px
</style>
