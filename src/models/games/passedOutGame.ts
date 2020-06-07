import OfficialGame from '@/models/games/officialGame'

export default class PassedOutGame extends OfficialGame {
  get gameTypeForApi () {
    return 'pass_out'
  }

  get totalValue () {
    return 0
  }

  get requestParams () {
    return this.requestBaseParams
  }

  get description () {
    return '#bold{text: "E"}'
  }

  get isWon () {
    return false
  }

  playerIndexReceivesPoints () {
    return false
  }

  lostForOtherPlayerIndex () {
    return false
  }
}
