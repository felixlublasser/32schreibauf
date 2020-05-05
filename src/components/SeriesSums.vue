<template>
  <div class="series-sums">
    <template v-if='series.games'>
      <div
        v-for='(rowValues, i) in rows' :key='i'
        class='series-sums__row'
      >
        <div v-for='(_, j) in series.numberOfPlayers' :key='j' class="series-sums__column">
          <span>{{ rowValues[j] }}</span>
        </div>
        <div class='series-sums__column' />
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Series from '@/models/series'

@Component
export default class SeriesSums extends Vue {
  @Prop(Series) private series!: Series
  @Prop(Boolean) private expanded!: boolean

  private get rows (): number[][] {
    if (!this.expanded) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return [this.series.totals!]
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return [this.series.sums!, this.series.ownBonuses!, this.series.foreignBonuses!, this.series.totals!]
  }
}
</script>

<style scoped lang="stylus">
.series-sums
  margin-top 8px
  display flex
  flex-direction column

  &__row
    display flex

    &:last-of-type
      margin-top 1px
      border-top 1px solid #333
      background-color #66ff66

    &:first-child
      border-top 1px solid #999

  &__column
    border-bottom 1px solid #999
    width 1px
    margin 0
    height 32px
    line-height 32px
    flex-grow 2

    &:not(:first-child)
      border-left 1px solid #999

    &:last-child
      border 0
      flex-grow 3
</style>
