import GameType from '@/models/gameType'
import Player from '@/models/player'

export default interface FullGameData {
  additionalPointLevelsAchieved: number;
  baseValue: number;
  declaredPointLevels: number;
  declarerSeat: number;
  gameIndex: number;
  gameType: GameType;
  id: number | null;
  isDurchmarsch: boolean;
  isHand: boolean;
  isOuvert: boolean;
  isWon: boolean;
  overbidValue: number | null;
  players: Player[];
  pointsAchieved: number;
  seatOfJungfrau: number | null;
  seatOfReceiverOfLastTrick: number | null;
  seatsOfAdditionalPointReceivers: number[];
  seatsPassedOn: boolean[];
  spaltarsch: boolean;
  straightTrumps: number;
  value: number | null;
  withOldOne: boolean;
}
