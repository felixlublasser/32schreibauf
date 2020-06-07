import Player from '@/models/player'
import SeriesEventType from '@/models/seriesEventType'

export default class TableChange {
  eventIndex: number
  table: (Player | null)[]

  constructor (eventIndex: number, table: (Player | null)[]) {
    this.eventIndex = eventIndex
    this.table = table
  }

  get eventType () {
    return SeriesEventType.tableChange
  }
}
