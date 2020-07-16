import Series from '@/models/series'
import Player from '@/models/player'
import SeriesResponse from '@/api/seriesResponse'
import GameResponse from '@/api/gameResponse'
import PlayerResponse from '@/api/playerResponse'
import SeriesRequest from '@/api/seriesRequest'
import GameRequest from '@/api/gameRequest'
import PlayerRequest from '@/api/playerRequest'
import ServerError from '@/api/serverError'
import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import Vue from 'vue'

const API_URL = process.env.VUE_APP_API_URL

@Module
export default class StoreModule extends VuexModule {
  seriesListResponse: SeriesResponse[] | null = null
  seriesResponse: SeriesResponse | null = null
  gamesResponse: { [index: number]: GameResponse[] } = {}
  playersResponse: PlayerResponse[] | null = null
  playerResponse: PlayerResponse | null = null

  // GETTERS

  get seriesList (): Series[] {
    return (this.seriesListResponse || []).map(data => Series.fromSeriesResponse(data, null))
  }

  get series (): Series | null {
    return this.seriesResponse && Series.fromSeriesResponse(this.seriesResponse, this.gamesResponse[this.seriesResponse.id] || null)
  }

  get players (): Player[] {
    return (this.playersResponse || []).map(data => Player.fromPlayerResponse(data))
  }

  get player (): Player | null {
    return this.playerResponse ? Player.fromPlayerResponse(this.playerResponse) : null
  }

  // SHOW player

  @Action({ commit: 'savePlayer', rawError: true })
  async fetchPlayer (playerName: string): Promise<{ player: PlayerResponse }> {
    const response = await fetch(`${API_URL}/players/${playerName}`)
    if (response.status === 404) {
      throw new ServerError(response)
    }
    return response.json() as Promise<{ player: PlayerResponse }>
  }

  @Mutation
  savePlayer (player: PlayerResponse) {
    this.playerResponse = player
  }

  // INDEX players

  @Action({ commit: 'savePlayersList', rawError: true })
  async fetchPlayers (): Promise<{ players: PlayerResponse[] }> {
    const response = await fetch(`${API_URL}/players`)
    return response.json() as Promise<{ players: PlayerResponse[] }>
  }

  @Mutation
  savePlayersList (players: PlayerResponse[]) {
    this.playersResponse = players
  }

  // CREATE player

  @Action({ commit: 'savePlayersList', rawError: true })
  async createPlayer (params: PlayerRequest): Promise<{ players: PlayerResponse[] }> {
    const response = await fetch(
      `${API_URL}/players`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(params)
      }
    )
    return response.json() as Promise<{ players: PlayerResponse[] }>
  }

  // INDEX series

  @Action({ commit: 'saveSeriesList', rawError: true })
  async fetchSeriesList (): Promise<{ series: SeriesResponse[] }> {
    const response = await fetch(`${API_URL}/series`)
    return response.json() as Promise<{ series: SeriesResponse[] }>
  }

  @Mutation
  saveSeriesList (seriesList: SeriesResponse[]) {
    this.seriesListResponse = seriesList
  }

  // SHOW series

  @Action({ commit: 'saveSeries', rawError: true })
  async fetchSeries (seriesId: number): Promise<{ series: SeriesResponse }> {
    const response = await fetch(`${API_URL}/series/${seriesId}`)
    return response.json() as Promise<{ series: SeriesResponse }>
  }

  @Mutation
  saveSeries (series: SeriesResponse) {
    this.seriesResponse = series
  }

  // CREATE series

  @Action({ commit: 'saveSeries', rawError: true })
  async createSeries (params: SeriesRequest): Promise<{ series: SeriesResponse }> {
    const response = await fetch(
      `${API_URL}/series`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(params)
      }
    )
    return response.json() as Promise<{ series: SeriesResponse }>
  }

  // UPDATE series

  @Action({ commit: 'saveSeries', rawError: true })
  async updateSeries ({ seriesId, params }: { seriesId: number; params: SeriesRequest }): Promise<{ series: SeriesResponse }> {
    const response = await fetch(
      `${API_URL}/series/${seriesId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(params)
      }
    )
    return response.json() as Promise<{ series: SeriesResponse }>
  }

  // DESTROY series

  @Action({ commit: 'saveSeriesList', rawError: true })
  async destroySeries ({ seriesId }: { seriesId: number }): Promise<{ series: SeriesResponse[] }> {
    const response = await fetch(`${API_URL}/series/${seriesId}`, { method: 'DELETE' })
    return response.json() as Promise<{ series: SeriesResponse[] }>
  }

  // INDEX series/games

  @Action({ commit: 'saveGamesList', rawError: true })
  async fetchSeriesGames (seriesId: number): Promise<{ games: GameResponse[]; seriesId: number }> {
    const response = await fetch(`${API_URL}/series/${seriesId}/games`)
    const parsedResponse = await response.json() as GameResponse[]
    return { games: parsedResponse, seriesId }
  }

  @Mutation
  saveGamesList (args: { games: GameResponse[]; seriesId: number }) {
    Vue.set(this.gamesResponse, args.seriesId, args.games)
  }

  // CREATE series/games

  @Action({ commit: 'saveGamesList', rawError: true })
  async createGame ({ seriesId, params }: { seriesId: number; params: GameRequest }): Promise<{ games: GameResponse[] }> {
    const response = await fetch(
      `${API_URL}/series/${seriesId}/games`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(params)
      }
    )
    return response.json() as Promise<{ games: GameResponse[] }>
  }

  // UPDATE series/games

  @Action({ commit: 'saveGamesList', rawError: true })
  async updateGame ({ seriesId, gameId, params }: { seriesId: number; gameId: number; params: GameRequest }): Promise<{ games: GameResponse[] }> {
    const response = await fetch(
      `${API_URL}/series/${seriesId}/games/${gameId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(params)
      }
    )
    return response.json() as Promise<{ games: GameResponse[] }>
  }
}
