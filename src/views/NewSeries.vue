<template>
  <div>
    <MainHeader>
      <BackButton slot='left' @click='$router.back()'/>
      <template slot='title'>Serie erstellen</template>
      <HeaderButton slot='right' @click='$router.push({ name: "home" })'><IconHome/></HeaderButton>
    </MainHeader>

    <div v-if='series' class="view">
      <TableChangeForm :allowChangeOfPlayerNumber='true' :series='newSeries' :players='players' @save='save'/>
      <SeriesForm :series='newSeries' :onlyTableChange='false' @save='save'/>
    </div>

    <MainFooter>
      <BigButton @click='save'><span>Speichern</span></BigButton>
    </MainFooter>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'
import BackButton from '@/components/BackButton.vue'
import BigButton from '@/components/BigButton.vue'
import HeaderButton from '@/components/HeaderButton.vue'
import IconHome from '@/assets/IconHome.vue'
import SeriesForm from '@/components/SeriesForm.vue'
import TableChangeForm from '@/components/TableChangeForm.vue'
import MainFooter from '@/components/MainFooter.vue'
import MainHeader from '@/components/MainHeader.vue'
import Player from '@/models/player'
import Series from '@/models/series'
import SeriesRequest from '@/api/seriesRequest'

@Component({
  components: {
    BackButton,
    BigButton,
    HeaderButton,
    IconHome,
    SeriesForm,
    TableChangeForm,
    MainFooter,
    MainHeader
  }
})
export default class NewSeries extends Vue {
  newSeries = Series.buildEmpty()

  @Action createSeries!: (data: SeriesRequest) => Series
  @Action fetchPlayers!: () => void

  @Getter players!: Player[]
  @Getter series!: Series | null

  async save () {
    await this.createSeries(this.newSeries.requestParams)
    if (this.series && this.series.id) {
      this.$router.push({ name: 'seriesGames', params: { seriesId: this.series.id.toString() } })
    }
  }

  async mounted () {
    if (!this.players.length) {
      await this.fetchPlayers()
    }
  }
}
</script>

<style scoped lang="stylus">
</style>
