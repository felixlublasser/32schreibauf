export default interface GameRequest {
  additional_point_levels?: number
  base_value?: number
  bidding_value?: number | null
  bock?: boolean
  declared_point_levels?: number
  declarerSeat?: number
  first_seat_passed_on?: boolean
  game_type: string
  notes?: string
  hand?: boolean
  jungfrau_seat?: number | null
  ouvert?: boolean
  seat_1_player_index: number
  seat_2_player_index: number
  seat_3_player_index: number
  spaltarsch?: boolean
  straight_trumps?: number
  point_receiver_seat?: number
  point_receiver_three_seat?: number | null
  point_receiver_two_seat?: number | null
  points_achieved?: number
  receiver_of_last_trick_seat?: number | null
  second_seat_passed_on?: boolean
  third_seat_passed_on?: boolean
  value: number
  with_old_one?: boolean
  won?: boolean
}
