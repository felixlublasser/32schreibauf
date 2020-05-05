<template>
  <div v-if='newGame' class="section-container">
    <div class="section">
      <h2 class="section-title">{{ newGame.isDurchmarsch ? 'Gewinner' : 'Verlierer' }}</h2>
      <DeclarerSelect
        :players='newGame.players'
        v-model='newGame.pointReceiverSeat'
      />
    </div>

    <div class="section">
      <h2 class="section-title">Durchm.</h2>
      <Checkbox
        v-model='newGame.isDurchmarsch'
        content="D"
      />
    </div>

    <template v-if='!newGame.isDurchmarsch'>
      <div class="section">
        <h2 class="section-title">Augen</h2>
        <InputNumber v-model='newGame.pointsAchieved' :min='40' :max='120' class="ramsch-options__points"/>
      </div>

      <div class="section">
        <h2 class="section-title">Jungfrau</h2>
        <DeclarerSelect
          :players='newGame.players'
          v-model='newGame.seatOfJungfrau'
          :allowNull='true'
        />
      </div>
    </template>

    <div class="section">
      <h2 class="section-title">Geschoben</h2>
      <div class="stack-horizontal">
        <template v-for='(player, i) in newGame.players'>
          <div v-if='i !== 0' :key='"spacer" + i' class="spacer-small" />
          <Checkbox
            :key='"passedOn" + i'
            v-model='newGame.seatsPassedOn[i]'
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
  @Prop(Object) newGame!: RamschGame
}
</script>

<style scoped lang="stylus">
.ramsch-options
  &__points
    width 55px
</style>
