import FullPlayerData from '@/models/fullPlayerData'

export default interface fullSeriesData {
  date: Date;
  closed: boolean;
  countsRamsch: boolean;
  id: number | null;
  maxPersistedGameEventIndex: number | null;
  negativeNotation: boolean;
  numberOfGames: number;
  notes: string | null;
  tableChanges: ({
    eventIndex: number;
    table: (FullPlayerData | null)[];
  })[]
}
