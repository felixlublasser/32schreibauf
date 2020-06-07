import PlayerResponse from '@/api/playerResponse'

export default interface GameResponse {
  additional_point_levels: number | undefined
  base_value: number | undefined
  bidding_value: number | null | undefined
  bock: boolean
  counts_towards_total: boolean
  declared_point_levels: number | undefined
  declarer_seat: number | undefined
  event_index: number
  first_seat_passed_on: boolean | undefined
  game_type: string
  hand: boolean | undefined
  id: number
  jungfrau_seat: number | null | undefined
  notes: string | null
  ouvert: boolean | undefined
  point_receiver_seat: number | undefined
  point_receiver_three_seat: number | null | undefined
  point_receiver_two_seat: number | null | undefined
  points_achieved: number | undefined
  receiver_of_last_trick_seat: number | null | undefined
  seat_1_player_index: number
  seat_2_player_index: number
  seat_3_player_index: number
  second_seat_passed_on: boolean | undefined
  spaltarsch: boolean | undefined
  straight_trumps: number | undefined
  table: PlayerResponse[]
  third_seat_passed_on: boolean | undefined
  value: number
  with_old_one: boolean | undefined
  won: boolean | undefined
}
