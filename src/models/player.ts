import PlayerResponse from '@/api/playerResponse'

export default class Player {
  data: PlayerResponse

  constructor (data: PlayerResponse) {
    this.data = data
  }

  get id () {
    return this.data.id
  }

  get name () {
    return this.data.name
  }
}
