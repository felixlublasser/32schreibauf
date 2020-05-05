<template>
  <div class="series-header">
    <div
      v-for='playerName in playerNames'
      :key='playerName'
      class="series-header__column"
    >
      <span>{{ playerName }}</span>
    </div>

    <div class="series-header__column"/>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Series from '@/models/series'

@Component
export default class SeriesHeader extends Vue {
  @Prop(Series) private series!: Series

  private get playerNames (): string[] {
    return this.series.players.map(p => p.name)
  }
}
</script>

<style scoped lang="stylus">
.series-header
  display flex
  background-color #f5f5f5
  position sticky

  &__column
    border-bottom 2px solid #333
    width 1px
    margin 0
    height 32px
    line-height 32px
    flex-grow 2
    font-weight bold

    &:not(:first-child)
      border-left 1px solid #999

    &:last-child
      border-left 2px solid #333
      flex-grow 3
</style>
