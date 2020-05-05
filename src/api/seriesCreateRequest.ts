export default interface SeriesCreateRequest {
  date: string
  number_of_players: number
  closed?: boolean
  counts_ramsch?: boolean
  negative_notation?: boolean
  notes?: string
  first_player_id: number
  second_player_id: number
  third_player_id: number
  fourth_player_id?: number
  fifth_player_id?: number
}
