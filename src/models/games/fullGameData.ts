import GameType from '@/models/gameType'
import Player from '@/models/player'

export default interface FullGameData {
  additionalPointLevelsAchieved: number;
  baseValue: number;
  declaredPointLevels: number;
  declarerSeat: number;
  eventIndex: number;
  gameType: GameType;
  id: number | null;
  index: number;
  isDurchmarsch: boolean;
  isHand: boolean;
  isOuvert: boolean;
  isSpaltarsch: boolean;
  isTestGame: boolean;
  isWon: boolean;
  overbidValue: number | null;
  players: Player[];
  pointsAchieved: number;
  seatOfJungfrau: number | null;
  seatOfReceiverOfLastTrick: number | null;
  seatsOfAdditionalPointReceivers: number[];
  seatsPassedOn: boolean[];
  straightTrumps: number;
  tableSize: number;
  value: number | null;
  withOldOne: boolean;
}
