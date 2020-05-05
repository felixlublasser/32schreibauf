<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="stylus">
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  padding-bottom 32px

body
  margin 0

.view
  margin 8px
  padding-bottom 32px
  overflow-x hidden

.spacer
  width 8px
  height 8px

  &-small
    width 4px
    height 4px

  &-big
    width 16px
    height 16px

  &-huge
    width 40px
    height 50px

&.stack
  &-vertical
    display flex
    flex-direction column

  &-horizontal
    display flex

  &-wrap-2
    display flex
    flex-wrap wrap

.section
  display flex
  flex-direction column
  align-items center
  padding 8px
  background-color #eee
  border-radius 8px
  margin 4px

  &-title
    font-size 20px
    font-weight bold
    color #666
    margin 0 0 8px 0

  &-container
    display flex
    justify-content flex-start
    flex-wrap wrap
    margin -4px
    align-items flex-start

.label
  &-big
    font-size 32px
    font-weight bold

  &-small
    font-size 16px
</style>
