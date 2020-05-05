import GameResponse from '@/api/gameResponse'
import Player from '@/models/player'
import GameBuilder from '@/models/games/gameBuilder'
import Game from '@/models/games/game'

export default class GamesList {
  data: GameResponse[]
  players: Player[]

  constructor (data: GameResponse[], players: Player[]) {
    this.data = data
    this.players = players
  }

  get games (): Game[] {
    return this.data.map(d => GameBuilder.fromGameResponse(d))
  }

  sumsUpTo (gameIndex: number) {
    return this.games.slice(0, gameIndex).reduce((sums, game) => {
      return this.playersMap().map((p, i) => sums[i] + game.valueForPlayerIndex(i, this.numberOfPlayers))
    }, new Array(this.numberOfPlayers).fill(0))
  }

  get sums (): number[] {
    return this.sumsUpTo(this.data.length)
  }

  get ownBonuses (): number[] {
    return this.playersMap().map(i => {
      return this.games.reduce((sum, game) => sum + game.wonForPlayerIndex(i, this.numberOfPlayers), 0) * 50
    })
  }

  private get numberOfPlayers () {
    return this.players.length
  }

  private playersMap () {
    return new Array(this.numberOfPlayers).fill(0).map((_, i) => i)
  }

  get foreignBonuses (): number[] {
    return this.playersMap().map(i => {
      return this.games.reduce((sum, game) => {
        return sum + game.lostForOtherPlayerIndex(i, this.numberOfPlayers)
      }, 0) * 120 / this.numberOfPlayers
    })
  }
}
