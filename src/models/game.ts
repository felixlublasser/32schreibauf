import Player from '@/models/player'

export default interface Game {
  value: number
  description: string
  currentPlayers: Player[]
  index: number

  valueForPlayer: (playerId: number) => number
  wonForPlayer: (playerId: number) => number
  lostForOtherPlayer: (playerId: number) => number
  playerReceivesPoints: (playerId: number) => boolean

  playerIndexReceivesPoints: (playerIndex: number, numberOfPlayers: number) => boolean
  valueForPlayerIndex: (playerIndex: number, numberOfPlayers: number) => number
}
