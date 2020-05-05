import FullGameData from '@/models/games/fullGameData'
import GameCreateRequest from '@/api/gameCreateRequest'
import GameType from '@/models/gameType'

export default abstract class Game {
  constructor (data: FullGameData) {
    this.data = data
  }

  data: FullGameData

  abstract get gameTypeForApi (): string
  abstract get totalValue (): number
  abstract get createRequestParams (): GameCreateRequest | null
  abstract get description (): string
  protected abstract get countsTowardsTotal (): boolean
  abstract wonForPlayerIndex (playerIndex: number, numberOfPlayers: number): number
  abstract lostForOtherPlayerIndex (playerIndex: number, numberOfPlayers: number): number
  abstract playerIndexReceivesPoints (playerIndex: number, numberOfPlayers: number): boolean

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
    return this.data.gameIndex
  }

  get value () {
    return this.data.value
  }

  protected playerIndexForSeat (seatIndex: number, numberOfPlayers: number) {
    return (seatIndex + 1 + this.index) % numberOfPlayers
  }

  valueForPlayerIndex (playerIndex: number, numberOfPlayers: number) {
    return (this.countsTowardsTotal && this.playerIndexReceivesPoints(playerIndex, numberOfPlayers)) ? this.value : 0
  }

  protected get createRequestBaseParams () {
    /* eslint-disable @typescript-eslint/camelcase */
    return {
      value: this.totalValue,
      game_type: this.gameTypeForApi, // convert to snake-case
      first_seat_id: this.firstSeatId,
      second_seat_id: this.secondSeatId,
      third_seat_id: this.thirdSeatId
    }
    /* eslint-enable @typescript-eslint/camelcase */
  }
}
