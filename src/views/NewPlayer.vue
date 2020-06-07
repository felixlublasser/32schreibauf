<template>
  <div>
    <MainHeader>
      <BackButton slot='left' @click='$router.back()'/>
      <template slot='title'>Neuer Spieler</template>
      <HeaderButton slot='right' @click='$router.push({ name: "home" })'><IconHome/></HeaderButton>
    </MainHeader>
    <div class="view">
      <div class="new-player">
        <PlayerSprite :player='newPlayer' />

        <div class="spacer-big"/>

        <span class="new-player__name-label">Spielername:</span>
        <div class="new-player__input-container">
          <div class="spacer-big"/>
          <div class="spacer"/>

          <div class="spacer"/>
          <InputText :value='newPlayer.name' @input='inputName' class="new-player__name-input"/>
          <div class="spacer"/>

          <template v-if='newPlayer.name !== ""'>
            <IconDots v-if='nameAvailable === null' class="new-player__icon new-player__icon--dots"/>
            <IconCheck v-else-if='nameAvailable' class="new-player__icon new-player__icon--check"/>
            <IconCross v-else class="new-player__icon new-player__icon--cross"/>
          </template>
          <template v-else>
            <div class="spacer"/>
            <div class="spacer-big"/>
          </template>
        </div>
      </div>
    </div>
    <MainFooter>
      <BigButton @click='savePlayer' :disabled='!newPlayer.isValid || nameAvailable === false'>
        Speichern
      </BigButton>
    </MainFooter>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'
import Player from '@/models/player'
import PlayerSprite from '@/components/PlayerSprite.vue'
import MainFooter from '@/components/MainFooter.vue'
import MainHeader from '@/components/MainHeader.vue'
import HeaderButton from '@/components/HeaderButton.vue'
import IconCheck from '@/assets/IconCheck.vue'
import IconCross from '@/assets/IconCross.vue'
import IconDots from '@/assets/IconDots.vue'
import IconHome from '@/assets/IconHome.vue'
import InputText from '@/components/InputText.vue'
import BackButton from '@/components/BackButton.vue'
import BigButton from '@/components/BigButton.vue'
import PlayerRequest from '@/api/playerRequest'
import ServerError from '@/api/serverError'

@Component({
  components: {
    BackButton,
    BigButton,
    HeaderButton,
    IconCheck,
    IconCross,
    IconDots,
    IconHome,
    InputText,
    MainFooter,
    MainHeader,
    PlayerSprite
  }
})
export default class NewPlayer extends Vue {
  @Action fetchPlayers!: () => void
  @Action fetchPlayer!: (playerName: string) => void
  @Action createPlayer!: (params: PlayerRequest) => void
  @Getter players!: Player[]
  @Getter player!: Player

  newPlayer = Player.buildEmpty()
  nameAvailable: boolean | null = null

  savePlayer () {
    this.createPlayer(this.newPlayer.requestParams)
    this.$router.back()
  }

  async inputName (v: string) {
    this.newPlayer.name = v
    if (v !== '') {
      this.checkPlayerName()
    }
  }

  async checkPlayerName () {
    this.nameAvailable = null
    try {
      await this.fetchPlayer(this.newPlayer.name)
    } catch (error) {
      if (!(error instanceof ServerError)) { throw error }
      this.nameAvailable = true
      return
    }
    this.nameAvailable = false
  }

  mounted (): void {
    this.fetchPlayers()
  }
}
</script>

<style scoped lang="stylus">
.new-player
  display flex
  flex-direction column
  align-items center

  &__input-container
    display flex
    align-items center

  &__name-input
    width 200px

  &__name-label
    width 200px
    text-align left
    font-size 16px

  &__icon
    height 20px
    width 20px

    &--check
      fill #384

    &--cross
      fill #a22

    &--dots
      fill #666
</style>
