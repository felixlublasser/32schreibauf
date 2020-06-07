import Game from '@/models/games/game'

export default abstract class RamschGame extends Game {
  abstract get pointsAchieved (): number
  abstract get multiplyingProperties (): boolean[]

  get totalValue () {
    return this.pointsAchieved * Math.pow(2, this.multipliers) * (this.isDurchmarsch ? 1 : -1)
  }

  private get multipliers () {
    return this.multiplyingProperties.reduce((sum, p) => sum + (p ? 1 : 0), 0)
  }

  get seatsPassedOn () {
    return this.data.seatsPassedOn
  }

  set seatsPassedOn (v) {
    this.data.seatsPassedOn = v
  }

  get isDurchmarsch () {
    return this.data.isDurchmarsch
  }

  set isDurchmarsch (v) {
    this.data.isDurchmarsch = v
  }

  get isTestGame () {
    return true
  }

  get pointReceiverSeat () {
    return this.data.declarerSeat
  }

  set pointReceiverSeat (v) {
    this.data.declarerSeat = v
  }

  get requestRamschParams () {
    if (!this.requestBaseParams) { return null }
    /* eslint-disable @typescript-eslint/camelcase */
    return {
      ...this.requestBaseParams,
      first_seat_passed_on: this.seatsPassedOn[0],
      second_seat_passed_on: this.seatsPassedOn[1],
      third_seat_passed_on: this.seatsPassedOn[2],
      point_receiver_seat: this.pointReceiverSeat
    }
    /* eslint-enable @typescript-eslint/camelcase */
  }

  abstract get description (): string
  abstract playerIndexReceivesPoints (playerIndex: number): boolean

  wonForPlayerIndex () {
    return 0
  }

  lostForOtherPlayerIndex () {
    return false
  }

  protected get passedOnDescr () {
    return this.seatsPassedOn.reduce((descr, po) => descr + (po ? 'G' : ''), '')
  }
}
