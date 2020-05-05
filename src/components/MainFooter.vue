<template>
  <div class="main-footer">
    <div class="main-footer__container">
      <router-link v-if='showHome' class="main-footer__link" :to='{ name: "home" }'>
        <IconHome class="main-footer__home" />
      </router-link>
      <slot/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import IconHome from '@/assets/IconHome.vue'

@Component({ components: { IconHome } })
export default class MainFooter extends Vue {
  @Prop({ type: Boolean, default: true }) showHome!: boolean
}
</script>

<style scoped lang="stylus">
.main-footer
  height 40px
  position fixed
  bottom 0
  background-color #eee
  width 100%
  border-top 1px solid #ddd

  &__container
    padding 0 8px
    display flex
    align-items center
    justify-content space-between
    height 100%

  &__link
    height 32px
    width 32px
    display flex
    align-items center
    justify-content center

  &__home
    height 24px
    width 24px
    stroke #888
    stroke-width 0.8px
</style>
