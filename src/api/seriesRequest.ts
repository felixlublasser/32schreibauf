export default interface SeriesRequest {
  closed?: boolean
  counts_ramsch?: boolean
  date: string
  negative_notation?: boolean
  notes?: string | null
  player_ids: { [index: string]: number | null }
  table_size: number
}
