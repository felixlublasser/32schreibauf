import Game from '@/models/games/game'

export default abstract class OfficialGame extends Game {
  abstract playerIndexReceivesPoints (playerIndex: number): boolean
  abstract get description (): string
  abstract get isWon (): boolean

  wonForPlayerIndex (playerIndex: number) {
    return this.playerIndexReceivesPoints(playerIndex) ? (this.isWon ? 1 : -1) : 0
  }

  lostForOtherPlayerIndex (playerIndex: number) {
    return !this.playerIndexReceivesPoints(playerIndex) && !this.isWon
  }
}
