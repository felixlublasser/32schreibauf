import SeriesEventType from '@/models/seriesEventType'

export default interface SeriesEvent {
  eventIndex: number;
  eventType: SeriesEventType;
}
