import PlayerResponse from '@/api/playerResponse'

export default interface SeriesResponse {
  closed: boolean
  counts_ramsch: boolean
  date: string
  id: number
  max_game_event_index: number
  negative_notation: boolean
  notes: string
  number_of_games: number
  table_changes: {
    event_index: number,
    table: PlayerResponse[]
  }[]
  table_size: number
}
