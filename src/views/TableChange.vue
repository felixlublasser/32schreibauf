<template>
  <div>
    <MainHeader>
      <BackButton slot='left' @click='$router.back()'/>
      <template slot='title'>Spielerwechsel</template>
      <HeaderButton slot='right' @click='$router.push({ name: "home" })'><IconHome/></HeaderButton>
    </MainHeader>

    <div v-if='seriesV' class="view">
      <TableChangeForm
        :allowChangeOfPlayerNumber='false'
        :series='seriesV'
        :players='players'
        @save='save'
      />
    </div>

    <MainFooter>
      <BigButton @click='save'><span>Speichern</span></BigButton>
    </MainFooter>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import BackButton from '@/components/BackButton.vue'
import BigButton from '@/components/BigButton.vue'
import HeaderButton from '@/components/HeaderButton.vue'
import IconHome from '@/assets/IconHome.vue'
import MainFooter from '@/components/MainFooter.vue'
import MainHeader from '@/components/MainHeader.vue'
import TableChangeForm from '@/components/TableChangeForm.vue'
import { Action, Getter } from 'vuex-class'
import SeriesRequest from '@/api/seriesRequest'
import Player from '@/models/player'
import Series from '@/models/series'

@Component({
  components: {
    BackButton,
    BigButton,
    HeaderButton,
    IconHome,
    MainFooter,
    MainHeader,
    TableChangeForm
  }
})
export default class TableChangeC extends Vue {
  @Action updateSeries!: (args: { seriesId: number; params: SeriesRequest }) => Series
  @Action fetchSeries!: (seriesId: number) => void
  @Action fetchPlayers!: () => void

  @Getter series!: Series
  @Getter players!: Player[]

  seriesV: Series | null = null

  get routeSeriesId () {
    return parseInt(this.$route.params.seriesId)
  }

  async save () {
    await this.updateSeries({ seriesId: this.routeSeriesId, params: this.series.requestParams })
    this.$router.push({ name: 'seriesGames', params: this.$route.params })
  }

  async mounted () {
    await this.fetchSeries(this.routeSeriesId)
    this.seriesV = this.series
    if (!this.players.length) {
      await this.fetchPlayers()
    }
  }
}
</script>

<style scoped lang="stylus">
</style>
