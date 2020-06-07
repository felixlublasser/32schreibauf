<template>
  <div v-if='game !== null' class="view">
    <div class="spacer"/>
    <div class="section">
      <h2 class="section-title">Spieltyp</h2>
      <RadioButtons v-model='gameType' :labels='gameTypeLabels'>
        <div slot="suit" class="game-form__suits">
          <Icon icon="diamonds" class="game-form__suit"/>
          <Icon icon="hearts" class="game-form__suit"/>
          <Icon icon="spades" class="game-form__suit"/>
          <Icon icon="clubs" class="game-form__suit"/>
        </div>
        <span slot="grand">{{ 'G' }}</span>
        <span slot="null">{{ '0' }}</span>
        <span slot="ramsch">{{ 'R' }}</span>
        <span slot="passedOut">{{ 'E' }}</span>
        <div slot="spacer" class="spacer-small" />
      </RadioButtons>
    </div>

    <div class='game-form__separator'/>

    <component v-if='game' :is='optionsComponent' :game='game' @replace='replaceGame'/>

    <div class='spacer-big'/>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import RadioButtons from '@/components/RadioButtons.vue'
import SuitOptions from '@/components/SuitOptions.vue'
import GrandOptions from '@/components/GrandOptions.vue'
import NullOptions from '@/components/NullOptions.vue'
import RamschOptions from '@/components/RamschOptions.vue'
import Icon from '@/components/Icon.vue'
import Game from '@/models/games/game'
import GameType from '@/models/gameType'
import Interpolator from '@/components/Interpolator.vue'
import GameBuilder from '@/models/games/gameBuilder'
import FullGameData from '@/models/games/fullGameData'

@Component({
  components: {
    Icon,
    Interpolator,
    GrandOptions,
    NullOptions,
    RadioButtons,
    RamschOptions,
    SuitOptions
  }
})
export default class GameForm extends Vue {
  @Prop(Object) private game!: Game | null

  get gameTypeOptions () {
    return ['suit', 'grand', 'null', 'ramsch', 'passedOut']
  }

  get gameTypeLabels () {
    return { suit: 'Farbe', grand: 'Grand', null: 'Null', ramsch: 'Ramsch', passedOut: 'Eingep.' }
  }

  save () {
    if (this.game !== null) {
      this.$emit('save')
    }
  }

  get optionsComponent () {
    if (this.game === null) { return null }
    const comps: {[index: string]: string | null } = {
      suit: 'SuitOptions',
      grand: 'GrandOptions',
      null: 'NullOptions',
      ramsch: 'RamschOptions',
      passedOut: null
    }
    return comps[this.gameType]
  }

  get gameType () {
    return this.game === null ? GameType.suit : this.game.gameType
  }

  set gameType (g: GameType) {
    if (this.game === null) { return }

    const newData = { ...this.game.data }
    newData.gameType = g
    this.$emit('input', GameBuilder.build(newData))
  }

  replaceGame (gameData: FullGameData) {
    this.$emit('input', GameBuilder.build(gameData))
  }
}
</script>

<style scoped lang="stylus">
.game-form
  &__separator
    border-bottom 1px solid #333
    margin 8px 0

  &__suits
    display flex
    flex-wrap wrap
    justify-content space-between
    align-content center
    margin-bottom -4px

  &__suit
    width 16px
    height 16px
    margin-bottom 4px

</style>
