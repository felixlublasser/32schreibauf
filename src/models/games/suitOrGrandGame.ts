import RegularGame from '@/models/games/regularGame'

export default abstract class SuitOrGrandGame extends RegularGame {
  abstract get baseValue (): number
  abstract get straightTrumps (): number
  abstract set straightTrumps (v: number)

  get gameTypeForApi () {
    return 'suit_or_grand'
  }

  get withOldOne () {
    return this.data.withOldOne
  }

  set withOldOne (v) {
    this.data.withOldOne = v
  }

  private get declaredPointLevels () {
    return this.data.declaredPointLevels
  }

  private set declaredPointLevels (v) {
    this.data.declaredPointLevels = v
  }

  get isSpaltarsch () {
    return (!this.isWon && !this.isSchneider) && this.data.isSpaltarsch
  }

  set isSpaltarsch (v) {
    this.data.isSpaltarsch = v
  }

  private get additionalPointLevelsAchieved () {
    return this.data.additionalPointLevelsAchieved
  }

  private set additionalPointLevelsAchieved (v) {
    this.data.additionalPointLevelsAchieved = v
  }

  get overbidValue () {
    return this.data.overbidValue
  }

  set overbidValue (v) {
    this.data.overbidValue = v
  }

  get isSchneider () {
    return this.pointLevels > 0
  }

  set isSchneider (v: boolean) {
    // true
    // 0 0 => 0 1
    // 0 1 => 0 1
    // 0 2 => 0 2
    // 1 0 => 1 0
    // 1 1 => 1 1
    // 2 0 => 2 0

    // false
    // 0 0 => 0 0
    // 0 1 => 0 0
    // 0 2 => 0 0
    // 1 0 => 0 0
    // 1 1 => 0 0
    // 2 0 => 0 0

    if (!v) {
      this.declaredPointLevels = 0
      this.additionalPointLevelsAchieved = 0
    } else if (!this.isSchneider) {
      this.additionalPointLevelsAchieved = 1
    }
  }

  get isSchwarz () {
    return this.pointLevels === 2
  }

  set isSchwarz (v: boolean) {
    // true
    // 0 0 => 0 2
    // 0 1 => 0 2
    // 0 2 => 0 2
    // 1 0 => 1 1
    // 1 1 => 1 1
    // 2 0 => 2 0

    // false
    // 0 0 => 0 0
    // 0 1 => 0 1
    // 0 2 => 0 1
    // 1 0 => 1 0
    // 1 1 => 1 0
    // 2 0 => 1 0

    if (v) {
      this.additionalPointLevelsAchieved = 2 - this.declaredPointLevels
    } else if (this.isSchwarz) {
      if (this.isSchwarzDeclared) {
        this.declaredPointLevels = 1
      } else {
        this.additionalPointLevelsAchieved = this.additionalPointLevelsAchieved - 1
      }
    }
  }

  get isSchneiderDeclared () {
    return this.declaredPointLevels > 0
  }

  set isSchneiderDeclared (v: boolean) {
    // true
    // 0 0 => 1 0
    // 0 1 => 1 0
    // 0 2 => 1 1
    // 1 0 => 1 0
    // 1 1 => 1 1
    // 2 0 => 2 0

    // false
    // 0 0 => 0 0
    // 0 1 => 0 1
    // 0 2 => 0 2
    // 1 0 => 0 1
    // 1 1 => 0 2
    // 2 0 => 0 2

    if (v) {
      if (!this.isSchneiderDeclared) {
        this.additionalPointLevelsAchieved = Math.max(0, this.additionalPointLevelsAchieved - 1)
      }
      this.declaredPointLevels = Math.max(1, this.declaredPointLevels)
    } else {
      this.additionalPointLevelsAchieved = this.pointLevels
      this.declaredPointLevels = 0
    }
  }

  get isSchwarzDeclared () {
    return this.declaredPointLevels === 2
  }

  set isSchwarzDeclared (v: boolean) {
    // true
    // 0 0 => 2 0
    // 0 1 => 2 0
    // 0 2 => 2 0
    // 1 0 => 2 0
    // 1 1 => 2 0
    // 2 0 => 2 0

    // false
    // 0 0 => 0 0
    // 0 1 => 0 1
    // 0 2 => 0 2
    // 1 0 => 1 0
    // 1 1 => 1 1
    // 2 0 => 1 1

    if (v) {
      this.declaredPointLevels = 2
      this.additionalPointLevelsAchieved = 0
    } else if (this.isSchwarzDeclared) {
      this.declaredPointLevels = 1
      this.additionalPointLevelsAchieved = 1
    }
  }

  private get pointLevels () {
    return this.declaredPointLevels + this.additionalPointLevelsAchieved
  }

  get requestParams () {
    if (!this.requestRegularGameParams) { return null }
    /* eslint-disable @typescript-eslint/camelcase */
    return {
      ...this.requestRegularGameParams,
      base_value: this.baseValue,
      straight_trumps: this.straightTrumps,
      with_old_one: this.withOldOne,
      declared_point_levels: this.declaredPointLevels,
      additional_point_levels: this.additionalPointLevelsAchieved,
      bidding_value: this.overbidValue,
      spaltarsch: this.isSpaltarsch
    }
    /* eslint-enable @typescript-eslint/camelcase */
  }

  get totalValue () {
    if (this.overbidValue && this.overbidValue > this.gameValue) {
      return this.baseValue * (Math.ceil(this.overbidValue / this.baseValue))
    }
    return this.gameValue * (this.isWon ? 1 : -2)
  }

  private get gameLevel () {
    return this.straightTrumps +
      1 +
      (this.declaredPointLevels * 2) +
      this.additionalPointLevelsAchieved +
      (this.isHand ? 1 : 0) +
      (this.isOuvert ? 1 : 0)
  }

  get gameValue () {
    return this.baseValue * this.gameLevel
  }

  private get suitDescr () {
    const symbols: { [index: number]: string } = {
      9: '#icon{icon: "diamonds"}',
      10: '#icon{icon: "hearts"}',
      11: '#icon{icon: "spades"}',
      12: '#icon{icon: "clubs"}',
      24: '#bold{text: "G"}'
    }
    return symbols[this.baseValue]
  }

  private get straightTrumpsDescr () {
    return `#${this.withOldOne ? 'superscript' : 'subscript'}{text: "${this.straightTrumps}"}`
  }

  private get additionalLevelsDescr () {
    return this.isSchwarz
      ? (this.isSchneiderDeclared ? (this.isSchwarzDeclared ? '§a' : 'SaS') : '§')
      : (this.isSchneider ? (this.isSchneiderDeclared ? 'Sa' : 'S') : '')
  }

  private get modifierDescr () {
    return this.handDescr +
      this.additionalLevelsDescr +
      this.ouvertDescr
  }

  get description () {
    return this.suitDescr + this.straightTrumpsDescr + this.modifierDescr
  }
}
