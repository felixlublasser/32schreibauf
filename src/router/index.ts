import Vue from 'vue'
import VueRouter from 'vue-router'
import SeriesList from '@/views/SeriesList.vue'
import SeriesGames from '@/views/SeriesGames.vue'
import NewSeries from '@/views/NewSeries.vue'
import NewGame from '@/views/NewGame.vue'
import NewPlayer from '@/views/NewPlayer.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: SeriesList
  },
  {
    path: '/series/new',
    name: 'newSeries',
    component: NewSeries
  },
  {
    path: '/series/:seriesId',
    name: 'seriesGames',
    component: SeriesGames
  },
  {
    path: '/series/:seriesId/new_game',
    name: 'newGame',
    component: NewGame
  },
  {
    path: '/players/new',
    name: 'newPlayer',
    component: NewPlayer
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
