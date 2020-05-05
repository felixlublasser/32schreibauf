<template>
  <div>
    <MainHeader>
      <template slot='title'>Willkommen!</template>
    </MainHeader>
    <div class="view">
      <template v-if='seriesList'>
        <SeriesSummary
          v-for='series in seriesList'
          :key='series.id'
          :series='series'
        />
      </template>
    </div>
    <MainFooter>
      <IconButton v-if='seriesList' icon='plus' @click='openNewSeriesScreen' text="Neue Serie" />
    </MainFooter>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'
import Series from '@/models/series'
import SeriesSummary from '@/components/SeriesSummary.vue'
import MainFooter from '@/components/MainFooter.vue'
import IconButton from '@/components/IconButton.vue'
import MainHeader from '@/components/MainHeader.vue'

@Component({
  components: { IconButton, MainHeader, MainFooter, SeriesSummary }
})
export default class SeriesList extends Vue {
  @Action fetchSeriesList!: () => void
  @Getter seriesList!: Series[]

  openNewSeriesScreen () {
    this.$router.push({ name: 'newSeries' })
  }

  mounted (): void {
    this.fetchSeriesList()
  }
}
</script>

<style scoped lang="stylus">
</style>
