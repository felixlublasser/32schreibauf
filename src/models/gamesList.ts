import GameResponse from '@/api/gameResponse'
import GameBuilder from '@/models/games/gameBuilder'
import Game from '@/models/games/game'

export default class GamesList {
  data: GameResponse[]
  tableSize: number

  constructor (data: GameResponse[], tableSize: number) {
    this.data = data
    this.tableSize = tableSize
  }

  get games (): Game[] {
    return this.data.map((d, i) => GameBuilder.fromGameResponse(d, i))
  }

  sumsUpTo (gameIndex: number) {
    return this.games.slice(0, gameIndex).reduce((sums, game) => {
      return this.playersMap().map((p, i) => sums[i] + game.valueForPlayerIndex(i))
    }, new Array(this.tableSize).fill(0))
  }

  get sums (): number[] {
    return this.sumsUpTo(this.data.length)
  }

  get ownBonuses (): number[] {
    return this.playersMap().map(i => {
      return this.games.reduce((sum, game) => sum + game.wonForPlayerIndex(i), 0) * 50
    })
  }

  private playersMap () {
    return new Array(this.tableSize).fill(0).map((_, i) => i)
  }

  get foreignBonuses (): number[] {
    return this.playersMap().map(i => {
      return this.games.reduce((sum, game) => {
        return sum + (game.lostForOtherPlayerIndex(i) ? 1 : 0)
      }, 0) * 120 / this.tableSize
    })
  }
}
