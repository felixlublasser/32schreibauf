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
      eventIndex: 0,
      gameType: GameType.suit,
      id: null,
      index: 0,
      isDurchmarsch: false,
      isHand: false,
      isOuvert: false,
      isSpaltarsch: false,
      isTestGame: false,
      isWon: true,
      overbidValue: null,
      players: [],
      pointsAchieved: 40,
      seatOfJungfrau: null,
      seatOfReceiverOfLastTrick: null,
      seatsOfAdditionalPointReceivers: [],
      seatsPassedOn: [false, false, false],
      straightTrumps: 1,
      tableSize: 3,
      value: null,
      withOldOne: true
    } as FullGameData
  }

  static fromGameResponse (data: GameResponse, index: number) {
    const defaultData = this.defaultData()
    const fullGameData: FullGameData = {
      additionalPointLevelsAchieved: data.additional_point_levels === undefined ? defaultData.additionalPointLevelsAchieved : data.additional_point_levels,
      baseValue: data.base_value === undefined ? defaultData.baseValue : data.base_value,
      declaredPointLevels: data.declared_point_levels === undefined ? defaultData.declaredPointLevels : data.declared_point_levels,
      declarerSeat: data.declarer_seat === undefined ? (data.point_receiver_seat === undefined ? defaultData.declarerSeat : data.point_receiver_seat) : data.declarer_seat,
      eventIndex: data.event_index,
      gameType: this.gameTypeFromApi(data),
      id: data.id,
      index: index,
      isDurchmarsch: data.game_type === 'durchmarsch',
      isHand: data.hand === undefined ? defaultData.isHand : data.hand,
      isOuvert: data.ouvert === undefined ? defaultData.isOuvert : data.ouvert,
      isSpaltarsch: data.spaltarsch === undefined ? defaultData.isSpaltarsch : data.spaltarsch,
      isTestGame: !data.counts_towards_total,
      isWon: data.won === undefined ? defaultData.isWon : data.won,
      overbidValue: data.bidding_value === undefined ? defaultData.overbidValue : data.bidding_value,
      players: [
        data.table[data.seat_1_player_index],
        data.table[data.seat_2_player_index],
        data.table[data.seat_3_player_index]
      ].map(d => new Player(d)),
      pointsAchieved: data.points_achieved === undefined ? defaultData.pointsAchieved : data.points_achieved,
      seatOfJungfrau: data.jungfrau_seat === undefined ? defaultData.seatOfJungfrau : data.jungfrau_seat,
      seatOfReceiverOfLastTrick: data.receiver_of_last_trick_seat === undefined ? defaultData.seatOfReceiverOfLastTrick : data.receiver_of_last_trick_seat,
      seatsOfAdditionalPointReceivers: ([data.point_receiver_two_seat, data.point_receiver_three_seat].filter(x => x !== null && x !== undefined) as number[]),
      seatsPassedOn: (data.first_seat_passed_on === undefined) ? defaultData.seatsPassedOn : [data.first_seat_passed_on, data.second_seat_passed_on, data.third_seat_passed_on] as boolean[],
      straightTrumps: data.straight_trumps === undefined ? defaultData.straightTrumps : data.straight_trumps,
      tableSize: data.table.length,
      value: data.value === undefined ? defaultData.value : data.value,
      withOldOne: data.with_old_one === undefined ? defaultData.withOldOne : data.with_old_one
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

  static buildEmpty (args: {
    gameType: GameType;
    players: Player[];
    tableSize: number;
    eventIndex: number;
    index: number;
  }) {
    const data = this.defaultData()
    data.gameType = args.gameType
    data.players = args.players
    data.eventIndex = args.eventIndex
    data.index = args.index
    data.tableSize = args.tableSize
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
