<template>
  <div v-if='game' class="section-container">
    <div class="section">
      <h2 class="section-title">{{ game.isDurchmarsch ? 'Gewinner' : 'Verlierer' }}</h2>
      <DeclarerSelect
        :players='game.players'
        v-model='game.pointReceiverSeat'
      />
    </div>

    <div class="section">
      <h2 class="section-title">Durchm.</h2>
      <Checkbox
        :value='game.isDurchmarsch'
        @input='setDurchmarsch'
        content="D"
      />
    </div>

    <template v-if='!game.isDurchmarsch'>
      <div class="section">
        <h2 class="section-title">Augen</h2>
        <InputNumber v-model='game.pointsAchieved' :min='40' :max='120' class="ramsch-options__points"/>
      </div>

      <div class="section">
        <h2 class="section-title">Jungfrau</h2>
        <DeclarerSelect
          :players='game.players'
          v-model='game.seatOfJungfrau'
          :allowNull='true'
        />
      </div>
    </template>

    <div class="section">
      <h2 class="section-title">Geschoben</h2>
      <div class="stack-horizontal">
        <template v-for='(player, i) in game.players'>
          <div v-if='i !== 0' :key='"spacer" + i' class="spacer-small" />
          <Checkbox
            :key='"passedOn" + i'
            v-model='game.seatsPassedOn[i]'
            :content='player.name[0]'
            :label='player.name'
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import RamschGame from '@/models/games/ramschGame'
import Checkbox from '@/components/Checkbox.vue'
import DeclarerSelect from '@/components/DeclarerSelect.vue'
import InputNumber from '@/components/InputNumber.vue'

@Component({ components: { Checkbox, DeclarerSelect, InputNumber } })
export default class RamschOptions extends Vue {
  @Prop(Object) game!: RamschGame

  setDurchmarsch (v: boolean) {
    if (v === this.game.isDurchmarsch) { return }

    this.game.isDurchmarsch = v
    this.$emit('replace', this.game.data)
  }
}
</script>

<style scoped lang="stylus">
.ramsch-options
  &__points
    width 55px
</style>
