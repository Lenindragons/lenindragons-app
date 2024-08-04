export type EventDate = {
  endDate: Date
  startDate: Date
  key: string
}

export type Icon = {
  name: string
  url: string
}

export type Event = {
  id: string
  name: string
  icon: Icon
  description: string
  dates: Array<EventDate>
}
