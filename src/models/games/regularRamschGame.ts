import RamschGame from '@/models/games/ramschGame'

export default class RegularRamschGame extends RamschGame {
  get gameTypeForApi () {
    return 'ramsch'
  }

  get multiplyingProperties () {
    return [
      ...this.seatsPassedOn,
      this.seatOfJungfrau !== null
    ]
  }

  get pointsAchieved () {
    return this.data.pointsAchieved
  }

  set pointsAchieved (v) {
    this.data.pointsAchieved = v
  }

  get seatOfJungfrau () {
    return this.data.seatOfJungfrau
  }

  set seatOfJungfrau (v) {
    this.data.seatOfJungfrau = v
  }

  get seatOfReceiverOfLastTrick () {
    return this.data.seatOfReceiverOfLastTrick
  }

  set seatOfReceiverOfLastTrick (v) {
    this.data.seatOfReceiverOfLastTrick = v
  }

  get createRequestParams () {
    /* eslint-disable @typescript-eslint/camelcase */
    return {
      ...this.createRequestRamschParams,
      jungfrau_seat: this.seatOfJungfrau,
      point_receiver_two_seat: this.data.seatsOfAdditionalPointReceivers[0],
      point_receiver_three_seat: this.data.seatsOfAdditionalPointReceivers[1],
      receiver_of_last_trick_seat: this.seatOfReceiverOfLastTrick,
      points_achieved: this.pointsAchieved
    }
    /* eslint-enable @typescript-eslint/camelcase */
  }

  get description () {
    return 'R' + this.jungfrauDescr + this.passedOnDescr
  }

  playerIndexReceivesPoints (playerIndex: number, numberOfPlayers: number) {
    return this.pointReceiverSeats.map(pr =>
      this.playerIndexForSeat(pr, numberOfPlayers)
    ).includes(playerIndex)
  }

  private get jungfrauDescr () {
    return (this.seatOfJungfrau !== null) ? 'J' : ''
  }

  private get pointReceiverSeats (): number[] {
    return [this.pointReceiverSeat, ...this.data.seatsOfAdditionalPointReceivers]
  }
}
