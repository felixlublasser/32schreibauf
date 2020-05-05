import PlayerResponse from '@/api/playerResponse'

export default interface SeriesResponse {
  id: number
  date: string
  number_of_players: number
  closed: boolean
  counts_ramsch: boolean
  negative_notation: boolean
  notes: string
  players: PlayerResponse[]
  number_of_games: number
}
