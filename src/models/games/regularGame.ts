import OfficialGame from '@/models/games/officialGame'
import GameCreateRequest from '@/api/gameCreateRequest'

export default abstract class RegularGame extends OfficialGame {
  abstract get gameTypeForApi (): string
  abstract get totalValue (): number
  abstract get createRequestParams (): GameCreateRequest | null
  abstract get description (): string
  abstract get gameValue (): number

  get countsTowardsTotal () {
    return true
  }

  playerIndexReceivesPoints (playerIndex: number, numberOfPlayers: number) {
    return this.playerIndexForSeat(this.declarerSeat, numberOfPlayers) === playerIndex
  }

  get isWon () {
    return this.data.isWon
  }

  set isWon (v: boolean) {
    this.data.isWon = v
  }

  get isHand () {
    return this.data.isHand
  }

  set isHand (v: boolean) {
    this.data.isHand = v
  }

  get handDescr () {
    return this.isHand ? 'H' : ''
  }

  get isOuvert () {
    return this.data.isOuvert
  }

  set isOuvert (v: boolean) {
    this.data.isOuvert = v
  }

  get ouvertDescr () {
    return this.isOuvert ? 'O' : ''
  }

  get declarerSeat () {
    return this.data.declarerSeat
  }

  set declarerSeat (v: number) {
    this.data.declarerSeat = v
  }

  get createRequestRegularGameParams () {
    /* eslint-disable @typescript-eslint/camelcase */
    return {
      ...this.createRequestBaseParams,
      declarer_seat: this.declarerSeat,
      hand: this.isHand,
      ouvert: this.isOuvert,
      game_value: this.gameValue,
      won: this.isWon
    }
    /* eslint-enable @typescript-eslint/camelcase */
  }
}
