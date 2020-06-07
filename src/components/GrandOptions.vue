<template>
  <div v-if='game' class="section-container">
    <div class="section">
      <h2 class="section-title">Alleinspieler</h2>
      <DeclarerSelect
        :players='game.players'
        v-model='game.declarerSeat'
      />
    </div>

    <div class="section">
      <h2 class="section-title">Buben</h2>

      <div class="stack-horizontal">
        <SwitchButtons
          v-model='game.withOldOne'
          name='with-old-one'
          :vertical='true'
        >
          <span slot='true' class='label-small'>mit</span>
          <span slot='false' class='label-small'>ohne</span>
        </SwitchButtons>

        <div class="spacer-small" />

        <RadioButtons v-model='straightTrumpsS' :stackerProps='{ wrap: 2 }'>
          <span
            v-for='i in [1, 2, 3, 4]'
            :key='i'
            :slot='i'
            class='label-big'
          >{{ i }}</span>
          <div slot='spacer' class="spacer-small" />
        </RadioButtons>
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">Gewinnstufen</h2>
      <div class="stack-vertical">
        <div class="stack-horizontal">
          <Checkbox
            v-model='game.isHand'
            label="Hand"
            content="H"
          />
          <div class="spacer-small" />
          <Checkbox
            v-model='game.isSchneider'
            label="Schndr."
            content="S"
          />
          <div class="spacer-small" />
          <Checkbox
            v-model='game.isSchneiderDeclared'
            label="anges."
            content="A"
          />
        </div>
        <div class="stack-horizontal">
          <Checkbox
            v-model='game.isSchwarz'
            label="Schwarz"
            content="S"
          />
          <div class="spacer-small" />
          <Checkbox
            v-model='game.isSchwarzDeclared'
            label="anges."
            content="A"
          />
          <div class="spacer-small" />
          <Checkbox
            v-model='game.isOuvert'
            label="Ouvert"
            content="O"
          />
        </div>
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">Ausgang</h2>
      <div class="grand-options__outcome">
        <SwitchButtons
          v-model='game.isWon'
          :labels='["gewonnen", "verloren"]'
        >
          <IconPlus slot='true'/>
          <span slot='false'>-</span>
        </SwitchButtons>
        <template v-if='!game.isWon && !game.isSchneider'>
          <div class="spacer"/>
          <Checkbox
            v-model='game.isSpaltarsch'
            label="Spaltarsch"
            content="X"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import GrandGame from '@/models/games/grandGame'
import SwitchButtons from '@/components/SwitchButtons.vue'
import RadioButtons from '@/components/RadioButtons.vue'
import DeclarerSelect from '@/components/DeclarerSelect.vue'
import Checkbox from '@/components/Checkbox.vue'
import IconPlus from '@/assets/IconPlus.vue'

@Component({ components: { Checkbox, DeclarerSelect, IconPlus, RadioButtons, SwitchButtons } })
export default class GrandOptions extends Vue {
  @Prop(Object) game!: GrandGame

  get straightTrumpsS () {
    return this.game.straightTrumps.toString()
  }

  set straightTrumpsS (v) {
    this.game.straightTrumps = parseInt(v)
  }
}
</script>

<style scoped lang="stylus">
.grand-options
  &__outcome
    display flex
    align-items center
</style>
