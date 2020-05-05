import Series from '@/models/series'
import Player from '@/models/player'
import SeriesResponse from '@/api/seriesResponse'
import GameResponse from '@/api/gameResponse'
import PlayerResponse from '@/api/playerResponse'
import SeriesUpdateRequest from '@/api/seriesUpdateRequest'
import SeriesCreateRequest from '@/api/seriesCreateRequest'
import GameCreateRequest from '@/api/gameCreateRequest'
import PlayerCreateRequest from '@/api/playerCreateRequest'
import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'

const API_URL = 'http://localhost:3030'

@Module
export default class StoreModule extends VuexModule {
  seriesListResponse: SeriesResponse[] | null = null
  seriesResponse: SeriesResponse | null = null
  gamesResponse: GameResponse[] | null = null
  playersResponse: PlayerResponse[] | null = null

  // GETTERS

  get seriesList (): Series[] {
    return (this.seriesListResponse || []).map(data => new Series(data, null))
  }

  get series (): Series | null {
    return this.seriesResponse && new Series(this.seriesResponse, this.gamesResponse)
  }

  get players (): Player[] {
    return (this.playersResponse || []).map(data => new Player(data))
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
  async createPlayer (params: PlayerCreateRequest): Promise<{ players: PlayerResponse[] }> {
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
  async createSeries (params: SeriesCreateRequest): Promise<{ series: SeriesResponse }> {
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
  async updateSeries ({ seriesId, params }: { seriesId: number; params: SeriesUpdateRequest }): Promise<{ series: SeriesResponse }> {
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

  // INDEX series/games

  @Action({ commit: 'saveGamesList', rawError: true })
  async fetchSeriesGames (seriesId: number): Promise<{ games: GameResponse[] }> {
    const response = await fetch(`${API_URL}/series/${seriesId}/games`)
    return response.json() as Promise<{ games: GameResponse[] }>
  }

  @Mutation
  saveGamesList (games: GameResponse[]) {
    this.gamesResponse = games
  }

  // CREATE series/games

  @Action({ commit: 'saveGamesList', rawError: true })
  async createGame ({ seriesId, params }: { seriesId: number; params: GameCreateRequest }): Promise<{ games: GameResponse[] }> {
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
}
