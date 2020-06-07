<template>
  <HeaderButton v-on='$listeners'>
    <span class="back-button__label">V</span>
  </HeaderButton>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import HeaderButton from '@/components/HeaderButton.vue'

@Component({ components: { HeaderButton } })
export default class BackButton extends Vue {}
</script>

<style scoped lang="stylus">
.back-button
  &__label
    transform rotate(90deg)
    display block
    font-size 20px
</style>
