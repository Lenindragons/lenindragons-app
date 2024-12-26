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

type PercentByPosition = {
  position: number
  value: number
}

type PlacePercentage = {
  max: number
  min: number
  percentByPosition: PercentByPosition[]
}

export type EventValues = {
  top4: PlacePercentage
  top6: PlacePercentage
  top8: PlacePercentage
}

export type Event = {
  id?: string
  name: string
  type: string
  icon: Icon
  description: string
  dates: Array<EventDate>
  values: EventValues
}
