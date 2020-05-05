import GameResponse from '@/api/gameResponse'
import NullGame from '@/models/games/nullGame'
import GrandGame from '@/models/games/grandGame'
import SuitGame from '@/models/games/suitGame'
import RegularRamschGame from '@/models/games/regularRamschGame'
import DurchmarschGame from '@/models/games/durchmarschGame'
import PassedOutGame from '@/models/games/passedOutGame'
import GameType from '@/models/gameType'
import Player from '@/models/player'
import FullGameData from '@/models/games/fullGameData'

export default class GameBuilder {
  static defaultData () {
    return {
      additionalPointLevelsAchieved: 0,
      baseValue: 9,
      declaredPointLevels: 0,
      declarerSeat: 0,
      gameIndex: 0,
      gameType: GameType.suit,
      id: null,
      isDurchmarsch: false,
      isHand: false,
      isOuvert: false,
      isWon: true,
      overbidValue: null,
      players: [],
      pointsAchieved: 40,
      seatOfJungfrau: null,
      seatOfReceiverOfLastTrick: null,
      seatsOfAdditionalPointReceivers: [],
      seatsPassedOn: [false, false, false],
      spaltarsch: false,
      straightTrumps: 1,
      value: null,
      withOldOne: true
    } as FullGameData
  }

  static fromGameResponse (data: GameResponse) {
    const fullGameData: FullGameData = {
      ...this.defaultData(),
      additionalPointLevelsAchieved: data.additional_point_levels,
      baseValue: data.base_value,
      declaredPointLevels: data.declared_point_levels,
      declarerSeat: data.declarer_seat === undefined ? data.point_receiver_seat : data.declarer_seat,
      gameIndex: data.game_index,
      gameType: this.gameTypeFromApi(data),
      id: data.id,
      isDurchmarsch: data.game_type === 'durchmarsch',
      isHand: data.hand,
      isOuvert: data.ouvert,
      isWon: data.won,
      overbidValue: data.bidding_value,
      players: [data.first_seat, data.second_seat, data.third_seat].map(d => new Player(d)),
      pointsAchieved: data.points_achieved,
      seatOfJungfrau: data.jungfrau_seat,
      seatOfReceiverOfLastTrick: data.receiver_of_last_trick_seat,
      seatsOfAdditionalPointReceivers: ([data.point_receiver_two_seat, data.point_receiver_three_seat].filter(x => x !== null) as number[]),
      seatsPassedOn: (data.first_seat_passed_on === undefined) ? [] : [data.first_seat_passed_on, data.second_seat_passed_on, data.third_seat_passed_on],
      spaltarsch: data.spaltarsch,
      straightTrumps: data.straight_trumps,
      value: data.value,
      withOldOne: data.with_old_one
    }

    return this.build(fullGameData)
  }

  static build (data: FullGameData) {
    switch (data.gameType) {
      case GameType.nulll:
        return new NullGame(data)
        break
      case GameType.grand:
        return new GrandGame(data)
        break
      case GameType.suit:
        return new SuitGame(data)
        break
      case GameType.ramsch:
        return data.isDurchmarsch ? new DurchmarschGame(data) : new RegularRamschGame(data)
        break
      case GameType.passedOut:
        return new PassedOutGame(data)
    }
  }

  static buildEmpty (gameType: GameType, players: Player[], gameIndex: number) {
    const data = this.defaultData()
    data.gameType = gameType
    data.players = players
    data.gameIndex = gameIndex
    return this.build(data)
  }

  static gameTypeFromApi (gameResponse: GameResponse) {
    switch (gameResponse.game_type) {
      case 'null':
        return GameType.nulll
        break
      case 'suit_or_grand':
        if (gameResponse.base_value === 24) {
          return GameType.grand
        } else {
          return GameType.suit
        }
        break
      case 'ramsch':
      case 'durchmarsch':
        return GameType.ramsch
        break
      case 'pass_out':
      default:
        return GameType.passedOut
    }
  }
}
