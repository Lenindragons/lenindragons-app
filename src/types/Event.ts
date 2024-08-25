import { Timestamp } from 'firebase/firestore'

export type EventDate = {
  endDate: Timestamp | string
  startDate: Timestamp | string
  key: string
}

export type Icon = {
  name: string
  url: string
}

export type Event = {
  id: string
  name: string
  type: string
  icon: Icon
  description: string
  dates: Array<EventDate>
}
