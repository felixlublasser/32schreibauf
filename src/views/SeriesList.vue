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
          @select='goToSeriesGames'
          @delete='deleteSeries'
        />
      </template>
    </div>
    <MainFooter>
      <BigButton v-if='seriesList' @click='openNewSeriesScreen'><span>Neue Serie</span></BigButton>
    </MainFooter>
    <WarningPopup v-if='seriesToBeDeleted !== null' @close='abortDeleteSeries'>
      <p slot='body'>
        {{ `Diese Serie enthält ${seriesToBeDeleted.numberOfGames} ${seriesToBeDeleted.numberOfGames === 1 ? "Spiel" : "Spiele"}. Willst du wirklich alles löschen?` }}
      </p>
      <template slot='cta'>
        <div class="stack-horizontal">
          <BigButton buttonType='serious' @click='forceDeleteSeries'>Ja, löschen</BigButton>
          <div class="spacer"/>
          <BigButton buttonType='benign' @click='abortDeleteSeries'>Lieber behalten</BigButton>
        </div>
      </template>
    </WarningPopup>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'
import Series from '@/models/series'
import SeriesSummary from '@/components/SeriesSummary.vue'
import MainFooter from '@/components/MainFooter.vue'
import BigButton from '@/components/BigButton.vue'
import MainHeader from '@/components/MainHeader.vue'
import WarningPopup from '@/components/WarningPopup.vue'

@Component({
  components: { BigButton, MainHeader, MainFooter, SeriesSummary, WarningPopup }
})
export default class SeriesList extends Vue {
  @Action fetchSeriesList!: () => void
  @Action destroySeries!: (args: { seriesId: number }) => void
  @Getter seriesList!: Series[]

  seriesToBeDeleted: Series | null = null

  goToSeriesGames (seriesId: number) {
    this.$router.push({ name: 'seriesGames', params: { seriesId: seriesId.toString() } })
  }

  deleteSeries (series: Series) {
    if (series.id === null) { return }
    if (series.numberOfGames === 0) {
      this.destroySeries({ seriesId: series.id })
    } else {
      this.seriesToBeDeleted = series
    }
  }

  forceDeleteSeries () {
    if (this.seriesToBeDeleted === null || this.seriesToBeDeleted.id === null) { return }
    this.destroySeries({ seriesId: this.seriesToBeDeleted.id })
    this.seriesToBeDeleted = null
  }

  abortDeleteSeries () {
    this.seriesToBeDeleted = null
  }

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
