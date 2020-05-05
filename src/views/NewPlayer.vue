<template>
  <div>
    <MainHeader>
      <BackButton slot='left' @click='$router.back()'/>
      <template slot='title'>Neuer Spieler</template>
    </MainHeader>
    <div class="view">
      <div class="new-player">
        <PlayerSprite :player='newPlayer' />

        <div class="spacer-big"/>

        <span class="new-player__name-label">Spielername:</span>
        <div class="new-player">
          <InputText v-model='newPlayer.name' class="new-player__name-input"/>
        </div>

        <div class="spacer-big"/>

        <BigButton @click='savePlayer' :disabled='!newPlayer.isValid'>
          Speichern
        </BigButton>
      </div>
    </div>
    <MainFooter/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'
import Player from '@/models/player'
import NewPlayer from '@/models/newPlayer'
import PlayerSprite from '@/components/PlayerSprite.vue'
import MainFooter from '@/components/MainFooter.vue'
import MainHeader from '@/components/MainHeader.vue'
import IconButton from '@/components/IconButton.vue'
import InputText from '@/components/InputText.vue'
import BackButton from '@/components/BackButton.vue'
import BigButton from '@/components/BigButton.vue'
import PlayerCreateRequest from '@/api/playerCreateRequest'

@Component({
  components: { BackButton, BigButton, IconButton, InputText, MainFooter, MainHeader, PlayerSprite }
})
export default class NewPlayerC extends Vue {
  @Action fetchPlayers!: () => void
  @Action createPlayer!: (params: PlayerCreateRequest) => void
  @Getter players!: Player[]

  newPlayer = new NewPlayer()

  savePlayer () {
    this.createPlayer(this.newPlayer.createRequestParams)
    this.$router.back()
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

  &__name-input
    width 200px

  &__name-label
    width 200px
    text-align left
    font-size 16px
</style>
