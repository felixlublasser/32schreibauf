<template>
  <component :is='component'/>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import IconCheck from '@/assets/IconCheck.vue'
import IconClubs from '@/assets/IconClubs.vue'
import IconDiamonds from '@/assets/IconDiamonds.vue'
import IconHearts from '@/assets/IconHearts.vue'
import IconHome from '@/assets/IconHome.vue'
import IconMinus from '@/assets/IconMinus.vue'
import IconPlus from '@/assets/IconPlus.vue'
import IconSpades from '@/assets/IconSpades.vue'

@Component({ components: { IconCheck, IconClubs, IconDiamonds, IconHearts } })
export default class Icon extends Vue {
  @Prop(String) private icon!: string

  get component () {
    switch (this.icon) {
      case 'check':
        return IconCheck
      case 'clubs':
        return IconClubs
      case 'diamonds':
        return IconDiamonds
      case 'hearts':
        return IconHearts
      case 'home':
        return IconHome
      case 'minus':
        return IconMinus
      case 'plus':
        return IconPlus
      case 'spades':
        return IconSpades
    }
  }
}
</script>
