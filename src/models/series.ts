import SeriesResponse from '@/api/seriesResponse'
import GameResponse from '@/api/gameResponse'
import Player from '@/models/player'
import GamesList from '@/models/gamesList'

export default class Series {
  data: SeriesResponse
  gamesData: GameResponse[] | null

  constructor (data: SeriesResponse, gamesData: GameResponse[] | null) {
    this.data = data
    this.gamesData = gamesData
  }

  get closed (): boolean {
    return this.data.closed
  }

  get countsRamsch (): boolean {
    return this.data.counts_ramsch
  }

  get date (): string {
    return this.data.date
  }

  get id (): number {
    return this.data.id
  }

  get negativeNotation (): boolean {
    return this.data.negative_notation
  }

  get notes (): string {
    return this.data.notes
  }

  get numberOfPlayers (): number {
    return this.data.number_of_players
  }

  get players (): Player[] {
    return this.data.players.map(p => new Player(p))
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

  private get gamesList () {
    return this.gamesData && new GamesList(this.gamesData, this.players)
  }

  get numberOfGames () {
    return this.gamesData ? this.gamesData.length : this.data.number_of_games
  }

  sumsUpTo (gameIndex: number) {
    return this.gamesList && this.gamesList.sumsUpTo(gameIndex)
  }

  get nextGameIndex () {
    return this.gamesData ? (this.gamesData[this.gamesData.length - 1].game_index + 1) : 0
  }
}
