import SuitOrGrandGame from '@/models/games/suitOrGrandGame'

export default class SuitGame extends SuitOrGrandGame {
  get baseValue () {
    return this.data.baseValue
  }

  set baseValue (v: number) {
    this.data.baseValue = v
  }

  get straightTrumps () {
    return this.data.straightTrumps
  }

  set straightTrumps (v) {
    this.data.straightTrumps = v
  }
}
