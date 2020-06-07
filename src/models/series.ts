import Player from '@/models/player'
import FullSeriesData from '@/models/fullSeriesData'
import GamesList from '@/models/gamesList'
import SeriesResponse from '@/api/seriesResponse'
import GameResponse from '@/api/gameResponse'
import TableChange from '@/models/tableChange'

export default class Series {
  private data: FullSeriesData
  gamesList: GamesList | null = null

  constructor (data: FullSeriesData) {
    this.data = data
  }

  static fromSeriesResponse (data: SeriesResponse, gamesData: GameResponse[] | null) {
    const newSeries = new Series({
      date: new Date(data.date),
      closed: data.closed,
      countsRamsch: data.counts_ramsch,
      id: data.id,
      maxPersistedGameEventIndex: data.max_game_event_index,
      negativeNotation: data.negative_notation,
      notes: data.notes,
      numberOfGames: data.number_of_games,
      tableChanges: data.table_changes.map(tc => {
        return {
          eventIndex: tc.event_index,
          table: tc.table.map(pd => pd && {
            id: pd.id,
            name: pd.name
          })
        }
      })
    })

    if (gamesData !== null) {
      newSeries.gamesList = new GamesList(gamesData, newSeries.players.length)
    }
    return newSeries
  }

  static buildEmpty () {
    return new Series({
      date: new Date(),
      closed: false,
      countsRamsch: false,
      id: null,
      maxPersistedGameEventIndex: null,
      negativeNotation: false,
      notes: null,
      numberOfGames: 0,
      tableChanges: [{
        eventIndex: 0,
        table: [null, null, null]
      }]
    })
  }

  get players () {
    return this.data.tableChanges[this.data.tableChanges.length - 1].table.map(pd => pd && new Player(pd))
  }

  set players (v: (Player | null)[]) {
    if (
      (v.length !== this.players.length) ||
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      v.some((p, i) => (p && p.id) !== (this.players[i] && this.players[i]!.id))
    ) {
      if (this.lastEventIsTableChange) {
        this.data.tableChanges[this.tableChanges.length - 1].table = v.map(p => p && p.data)
      } else {
        this.data.tableChanges = this.data.tableChanges.concat({
          eventIndex: this.nextEventIndex,
          table: v.map(p => p && p.data)
        })
      }
    }
  }

  get allPlayers () {
    let result: Player[] = []
    this.tableChanges.forEach(tc => {
      tc.table.forEach(pp => {
        if (pp !== null && !result.map(r => r.id).includes(pp.id)) {
          result = result.concat(pp)
        }
      })
    })
    return result
  }

  get tableChanges () {
    return this.data.tableChanges.map(tc => {
      return new TableChange(tc.eventIndex, tc.table.map(pd => pd && new Player(pd)))
    })
  }

  private get lastEventIsTableChange () {
    return (this.maxGameEventIndex === null) || this.maxTableChangeEventIndex > this.maxGameEventIndex
  }

  private get maxGameEventIndex () {
    return this.games
      ? this.games.length > 0 ? this.games[this.games.length - 1].eventIndex : null
      : this.maxPersistedGameEventIndex
  }

  private get maxTableChangeEventIndex () {
    return this.tableChanges[this.tableChanges.length - 1].eventIndex
  }

  private get maxEventIndex () {
    return (this.maxGameEventIndex === null)
      ? this.maxTableChangeEventIndex
      : Math.max(this.maxGameEventIndex, this.maxTableChangeEventIndex)
  }

  get nextEventIndex () {
    return this.maxEventIndex + 1
  }

  get maxPersistedGameEventIndex () {
    return this.data.maxPersistedGameEventIndex
  }

  get closed () {
    return this.data.closed
  }

  set closed (v: boolean) {
    this.data.closed = v
  }

  get countsRamsch () {
    return this.data.countsRamsch
  }

  get date () {
    return this.data.date
  }

  set date (v: Date) {
    this.data.date = v
  }

  get id () {
    return this.data.id
  }

  get negativeNotation () {
    return this.data.negativeNotation
  }

  get notes () {
    return this.data.notes
  }

  set notes (v: string | null) {
    this.data.notes = v
  }

  get numberOfPlayers () {
    return this.players.length
  }

  get games () {
    return this.gamesList && this.gamesList.games
  }

  get sums (): number[] | null {
    return this.gamesList && this.gamesList.sums
  }

  get ownBonuses (): number[] | null {
    return this.gamesList && this.gamesList.ownBonuses
  }

  get foreignBonuses (): number[] | null {
    return this.gamesList && this.gamesList.foreignBonuses
  }

  get totals (): number[] | null {
    if (!this.sums || !this.ownBonuses || !this.foreignBonuses) { return null }
    return this.sums && this.sums.map((s, i: number) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return s + this.ownBonuses![i] + this.foreignBonuses![i]
    })
  }

  get playersForNextGame () {
    return this.playerIndicesForNextGame.map(i => this.players[i])
  }

  get playerIndicesForNextGame () {
    return [0, 1, 2].map(i => (i + 1 + this.numberOfGames) % this.numberOfPlayers)
  }

  get numberOfGames () {
    return this.games ? this.games.length : this.data.numberOfGames
  }

  sumsUpTo (gameIndex: number) {
    return this.gamesList && this.gamesList.sumsUpTo(gameIndex)
  }

  private get events (): SeriesEvent[] {
    const ar: SeriesEvent[] = []
    return ar
      .concat(this.tableChanges)
      .concat(this.games || []).sort((e1, e2) => e1.eventIndex - e2.eventIndex)
  }

  get playerIdsParam () {
    const ob: {[index: string]: number | null} = {}
    this.players.forEach((p, i) => {
      ob[i.toString()] = p === null ? p : p.id
    })
    return ob
  }

  get requestParams () {
    /* eslint-disable @typescript-eslint/camelcase */
    return {
      date: this.data.date.toISOString().slice(0, 10),
      closed: this.data.closed,
      counts_ramsch: this.data.countsRamsch,
      negative_notation: this.data.negativeNotation,
      notes: this.data.notes,
      player_ids: this.playerIdsParam,
      table_size: this.players.length
    }
    /* eslint-enable @typescript-eslint/camelcase */
  }

  get isValid () {
    return !this.players.some(x => x === null)
  }
}

interface SeriesEvent {
  eventIndex: number;
}
