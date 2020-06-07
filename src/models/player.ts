import PlayerResponse from '@/api/playerResponse'
import FullPlayerData from '@/models/fullPlayerData'

export default class Player {
  data: FullPlayerData

  constructor (data: FullPlayerData) {
    this.data = data
  }

  static fromPlayerResponse (data: PlayerResponse) {
    return new Player({
      id: data.id,
      name: data.name
    })
  }

  static buildEmpty () {
    return new Player({
      id: null,
      name: ''
    })
  }

  get id () {
    return this.data.id
  }

  get name () {
    return this.data.name
  }

  set name (v: string) {
    this.data.name = v
  }

  get requestParams () {
    return {
      name: this.name
    }
  }

  get isValid () {
    return (this.name !== '')
  }
}
