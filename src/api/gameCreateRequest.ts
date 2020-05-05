export default interface GameCreateRequest {
  value: number
  bock?: boolean
  notes?: string
  game_type: string
  first_seat_id: number
  second_seat_id: number
  third_seat_id: number
  hand?: boolean
  ouvert?: boolean
  won?: boolean
  declarerSeat?: number
  base_value?: number
  straight_trumps?: number
  with_old_one?: boolean
  declared_point_levels?: number
  additional_point_levels?: number
  spaltarsch?: boolean
  bidding_value?: number | null
}
