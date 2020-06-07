import FullGameData from '@/models/games/fullGameData'
import GameRequest from '@/api/gameRequest'
import GameType from '@/models/gameType'
import SeriesEventType from '@/models/seriesEventType'

export default abstract class Game {
  constructor (data: FullGameData) {
    this.data = data
  }

  data: FullGameData

  abstract get description (): string
  abstract get gameTypeForApi (): string
  abstract get requestParams (): GameRequest | null
  abstract get totalValue (): number
  abstract lostForOtherPlayerIndex (playerIndex: number): boolean
  abstract playerIndexReceivesPoints (playerIndex: number): boolean
  abstract wonForPlayerIndex (playerIndex: number): number

  get isValid () {
    return true
  }

  get gameType () {
    return this.data.gameType
  }

  set gameType (v: GameType) {
    this.data.gameType = v
  }

  get players () {
    return this.data.players
  }

  private get firstSeatId () {
    return this.players[0].id
  }

  private get secondSeatId () {
    return this.players[1].id
  }

  private get thirdSeatId () {
    return this.players[2].id
  }

  get id () {
    return this.data.id
  }

  get index () {
    return this.data.index
  }

  get eventIndex () {
    return this.data.eventIndex
  }

  get eventType () {
    return SeriesEventType.game
  }

  get value () {
    return this.data.value || 0 // TODO: compute actual value
  }

  get tableSize () {
    return this.data.tableSize
  }

  get isTestGame () {
    return this.data.isTestGame
  }

  protected playerIndexForSeat (seatIndex: number) {
    return (seatIndex + 1 + this.index) % this.tableSize
  }

  playerIndexTakesPart (playerIndex: number) {
    return this.seatForPlayerIndex(playerIndex) !== null
  }

  seatForPlayerIndex (playerIndex: number) {
    const seatIndex = ((playerIndex - this.index + this.tableSize - 1) + Math.ceil(this.index / this.tableSize) * this.tableSize) % this.tableSize
    return seatIndex > 2 ? null : seatIndex
  }

  valueForPlayerIndex (playerIndex: number) {
    return (!this.isTestGame && this.playerIndexReceivesPoints(playerIndex)) ? this.value : 0
  }

  protected get requestBaseParams () {
    if (!this.firstSeatId || !this.secondSeatId || !this.thirdSeatId) { return null }
    /* eslint-disable @typescript-eslint/camelcase */
    return {
      value: this.totalValue,
      game_type: this.gameTypeForApi,
      seat_1_player_index: this.playerIndexForSeat(0),
      seat_2_player_index: this.playerIndexForSeat(1),
      seat_3_player_index: this.playerIndexForSeat(2)
    }
    /* eslint-enable @typescript-eslint/camelcase */
  }
}
