import Vue from 'vue'
import VueRouter from 'vue-router'
import SeriesList from '@/views/SeriesList.vue'
import SeriesGames from '@/views/SeriesGames.vue'
import NewSeries from '@/views/NewSeries.vue'
import TableChange from '@/views/TableChange.vue'
import NewGame from '@/views/NewGame.vue'
import EditGame from '@/views/EditGame.vue'
import NewPlayer from '@/views/NewPlayer.vue'
import EditSeries from '@/views/EditSeries.vue'

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
    path: '/series/:seriesId/edit',
    name: 'editSeries',
    component: EditSeries
  },
  {
    path: '/series/:seriesId/table_change',
    name: 'tableChange',
    component: TableChange
  },
  {
    path: '/series/:seriesId/new_game',
    name: 'newGame',
    component: NewGame
  },
  {
    path: '/series/:seriesId/games/:gameId',
    name: 'editGame',
    component: EditGame
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
