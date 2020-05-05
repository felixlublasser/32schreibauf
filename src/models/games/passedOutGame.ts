import OfficialGame from '@/models/games/officialGame'

export default class PassedOutGame extends OfficialGame {
  get gameTypeForApi () {
    return 'pass_out'
  }

  get totalValue () {
    return 0
  }

  get createRequestParams () {
    return this.createRequestBaseParams
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
}
