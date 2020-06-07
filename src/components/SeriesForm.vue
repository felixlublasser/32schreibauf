<template>
  <div>
    <div class="spacer-big"/>

    <p class="series-form__text-input-label">Spieldatum</p>
    <InputText v-model='seriesDateFormatted' type="date"/>

    <div class="spacer-big"/>

    <p class="series-form__text-input-label">Anmerkungen</p>
    <InputText v-model='series.notes' class="series-form__notes"/>

    <div class="spacer-big"/>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Series from '@/models/series'
import InputText from '@/components/InputText.vue'

@Component({
  components: { InputText }
})
export default class SeriesForm extends Vue {
  @Prop(Series) private series!: Series

  get seriesDateFormatted () {
    return this.series.date.toISOString().slice(0, 10)
  }

  set seriesDateFormatted (v: string) {
    const date = new Date(v)
    if (isNaN(date.getDate())) { return }
    this.series.date = new Date(v)
  }
}
</script>

<style scoped lang="stylus">
.series-form
  &__notes
    width calc(100% - 20px)

  &__text-input-label
    font-weight bold
</style>
