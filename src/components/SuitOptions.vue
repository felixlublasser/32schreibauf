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
      <h2 class="section-title">Trumpf</h2>

      <RadioButtons v-model='baseValueS' :stackerProps='{ wrap: 2 }'>
        <span
          v-for='(v, i) in [9, 10, 11, 12]'
          :key='v'
          :slot='v'
          class='label-big'
        >{{ '♦♥♠♣'[i] }}</span>
        <div slot='spacer' class="spacer-small" />
      </RadioButtons>
    </div>

    <div class="section">
      <h2 class="section-title">Spitzen</h2>

      <div class="stack-vertical">
        <SwitchButtons
          v-model='newGame.withOldOne'
          name='with-old-one'
          :horizontal='true'
        >
          <span slot='true' class='label-small'>mit</span>
          <span slot='false' class='label-small'>ohne</span>
        </SwitchButtons>

        <div class="spacer-small" />

        <RadioButtons v-model='straightTrumpsS' :stackerProps='{ wrap: 2, show: n => showHighTrumpOptions || (n < 5) }'>
          <span
            v-for='i in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]'
            :key='i'
            :slot='i'
            class='label-big'
          >{{ i }}</span>
          <div slot='spacer' class="spacer-small" />
        </RadioButtons>

        <div class="spacer-small" />

        <Checkbox v-if='!showHighTrumpOptions' v-model='showHighTrumpOptions'>
          <span class='label-big'>></span>
        </Checkbox>
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">Gewinnstufen</h2>
      <div class="stack-vertical">
        <div class="stack-horizontal">
          <Checkbox
            v-model='newGame.isHand'
            label="Hand"
            content="H"
          />
          <div class="spacer-small" />
          <Checkbox
            v-model='newGame.isSchneider'
            label="Schndr."
            content="S"
          />
          <div class="spacer-small" />
          <Checkbox
            v-model='newGame.isSchneiderDeclared'
            label="anges."
            content="A"
          />
        </div>
        <div class="stack-horizontal">
          <Checkbox
            v-model='newGame.isSchwarz'
            label="Schwarz"
            content="S"
          />
          <div class="spacer-small" />
          <Checkbox
            v-model='newGame.isSchwarzDeclared'
            label="anges."
            content="A"
          />
          <div class="spacer-small" />
          <Checkbox
            v-model='newGame.isOuvert'
            label="Ouvert"
            content="O"
          />
        </div>
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
          <span slot='false'>-</span>
        </SwitchButtons>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import SuitGame from '@/models/games/suitGame'
import SwitchButtons from '@/components/SwitchButtons.vue'
import RadioButtons from '@/components/RadioButtons.vue'
import DeclarerSelect from '@/components/DeclarerSelect.vue'
import Checkbox from '@/components/Checkbox.vue'
import IconPlus from '@/assets/IconPlus.vue'

@Component({ components: { Checkbox, DeclarerSelect, IconPlus, RadioButtons, SwitchButtons } })
export default class SuitOptions extends Vue {
  @Prop(Object) newGame!: SuitGame

  showHighTrumpOptionsB = false

  get baseValueS () {
    return this.newGame.baseValue.toString()
  }

  set baseValueS (v) {
    this.newGame.baseValue = parseInt(v)
  }

  get straightTrumpsS () {
    return this.newGame.straightTrumps.toString()
  }

  set straightTrumpsS (v) {
    this.newGame.straightTrumps = parseInt(v)
  }

  get showHighTrumpOptions () {
    return (this.newGame.straightTrumps > 4) || this.showHighTrumpOptionsB
  }

  set showHighTrumpOptions (v) {
    this.showHighTrumpOptionsB = v
  }
}
</script>

<style scoped lang="stylus">
</style>
