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

  get createRequestParams () {
    return this.createRequestRamschParams
  }

  get description () {
    return 'RD' + this.passedOnDescr
  }

  playerIndexReceivesPoints (playerIndex: number, numberOfPlayers: number) {
    return this.playerIndexForSeat(this.pointReceiverSeat, numberOfPlayers) === playerIndex
  }
}
