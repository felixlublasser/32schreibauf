import Game from '@/models/games/game'

export default class GamesCollection {
  private games: Game[]

  constructor (games: Game[]) {
    this.games = games
  }

  slice (gameIndex: number) {
    return new GamesCollection(this.games.filter(g => g.index <= gameIndex))
  }

  totalForPlayerIndex (playerIndex: number) {
    return this.games.reduce((sums, game) => {
      return sums + game.valueForPlayerIndex(playerIndex)
    }, 0)
  }
}
