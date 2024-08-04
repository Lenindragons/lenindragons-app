import { Timestamp } from 'firebase/firestore'
import { Event, EventDate } from './Event'

export type Challenge = {
  rounds: number
  roundTime: number
  event: Event
  dates: EventDate
  created: Timestamp
}
