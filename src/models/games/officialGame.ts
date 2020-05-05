import Game from '@/models/games/game'

export default abstract class OfficialGame extends Game {
  abstract playerIndexReceivesPoints (playerIndex: number, numberOfPlayers: number): boolean
  abstract get description (): string
  abstract get isWon (): boolean

  get countsTowardsTotal () {
    return true
  }

  wonForPlayerIndex (playerIndex: number, numberOfPlayers: number) {
    return this.playerIndexReceivesPoints(playerIndex, numberOfPlayers) ? (this.isWon ? 1 : -1) : 0
  }

  lostForOtherPlayerIndex (playerIndex: number, numberOfPlayers: number) {
    return (!this.playerIndexReceivesPoints(playerIndex, numberOfPlayers) && this.isWon === false) ? 1 : 0
  }
}
