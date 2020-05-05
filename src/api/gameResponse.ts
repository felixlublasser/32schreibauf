import PlayerResponse from '@/api/playerResponse'

export default interface GameResponse {
  additional_point_levels: number
  base_value: number
  bidding_value: number | null
  bock: boolean
  declared_point_levels: number
  declarer_seat: number
  first_seat: PlayerResponse
  first_seat_passed_on: boolean
  game_index: number
  game_type: string
  hand: boolean
  id: number
  jungfrau_seat: number | null
  notes: string
  ouvert: boolean
  point_receiver_seat: number
  point_receiver_three_seat: number | null
  point_receiver_two_seat: number | null
  points_achieved: number
  receiver_of_last_trick_seat: number | null
  second_seat: PlayerResponse
  second_seat_passed_on: boolean
  spaltarsch: boolean
  straight_trumps: number
  third_seat: PlayerResponse
  third_seat_passed_on: boolean
  value: number
  with_old_one: boolean
  won: boolean
}
