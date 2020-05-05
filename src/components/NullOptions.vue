<template>
  <div v-if='newGame' class="section-container">
    <div class="section">
      <h2 class="section-title">Alleinspieler</h2>
      <DeclarerSelect
        :players='newGame.players'
        v-model='newGame.declarerSeat'
      />
    </div>
    <div class="section">
      <h2 class="section-title">Gewinnstufen</h2>

      <div class="stack-horizontal">
        <Checkbox
          v-model='newGame.isHand'
          label="Hand"
          content="H"
        />
        <div class="spacer-small" />
        <Checkbox
          v-model='newGame.isOuvert'
          label="Ouvert"
          content="O"
        />
      </div>
    </div>
    <div class="section">
      <h2 class="section-title">Ausgang</h2>
      <div class="stack-horizontal">
        <SwitchButtons
          v-model='newGame.isWon'
          :labels='["gewonnen", "verloren"]'
        >
          <IconPlus slot='true'/>
          <span slot='false'>{{ '-' }}</span>
        </SwitchButtons>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import NullGame from '@/models/games/nullGame'
import DeclarerSelect from '@/components/DeclarerSelect.vue'
import Checkbox from '@/components/Checkbox.vue'
import SwitchButtons from '@/components/SwitchButtons.vue'
import IconPlus from '@/assets/IconPlus.vue'

@Component({ components: { Checkbox, DeclarerSelect, IconPlus, SwitchButtons } })
export default class NullOptions extends Vue {
  @Prop(Object) newGame!: NullGame
}
</script>

<style scoped lang="stylus">
</style>
