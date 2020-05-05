import RegularGame from '@/models/games/regularGame'

export default class NullGame extends RegularGame {
  get gameTypeForApi () {
    return 'null'
  }

  get createRequestParams () {
    return this.createRequestRegularGameParams
  }

  get totalValue () {
    return this.gameValue * (this.isWon ? 1 : -2)
  }

  get gameValue () {
    if (this.isHand) {
      return this.isOuvert ? 59 : 35
    } else {
      return this.isOuvert ? 46 : 23
    }
  }

  get description () {
    return '#bold{text: "0"}' + this.ouvertDescr + this.handDescr
  }
}
