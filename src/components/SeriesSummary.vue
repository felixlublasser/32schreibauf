<template>
  <div class="series-summary" @click='goToSeriesGames'>
    <p class="series-summary__datum">{{ series.date }}</p>
    <p class="series-summary__datum">{{ playerNames }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Series from '@/models/series'

@Component
export default class SeriesSummary extends Vue {
  @Prop(Series) private series!: Series

  private get playerNames (): string {
    return this.series.players.map(p => p.name).join(', ')
  }

  goToSeriesGames (): void {
    this.$router.push({ name: 'seriesGames', params: { seriesId: this.series.id.toString() } })
  }
}
</script>

<style scoped lang="stylus">
.series-summary
  display flex
  flex-direction row
  cursor pointer

  &:not(:last-child)
    border-bottom 1px solid #999

  &__datum
    margin 8px
</style>
