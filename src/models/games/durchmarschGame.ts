import RamschGame from '@/models/games/ramschGame'

export default class RegularRamschGame extends RamschGame {
  get gameTypeForApi () {
    return 'durchmarsch'
  }

  get multiplyingProperties () {
    return this.seatsPassedOn
  }

  get pointsAchieved () {
    return 120
  }

  get requestParams () {
    return this.requestRamschParams
  }

  get description () {
    return '#bold{text: "RD"}' + this.passedOnDescr
  }

  playerIndexReceivesPoints (playerIndex: number) {
    return this.playerIndexForSeat(this.pointReceiverSeat) === playerIndex
  }
}
