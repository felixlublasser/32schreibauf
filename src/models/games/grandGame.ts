import SuitOrGrandGame from '@/models/games/suitOrGrandGame'

export default class SuitGame extends SuitOrGrandGame {
  get baseValue () {
    return 24
  }

  get straightTrumps () {
    return Math.min(this.data.straightTrumps, 4)
  }

  set straightTrumps (v) {
    this.data.straightTrumps = Math.min(v, 4)
  }
}
