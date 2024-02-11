export type EventDate = {
  endDate: Date
  startDate: Date
  key: string
}

export type Event = {
  name: string
  image: File
  description: string
  dates: Array<EventDate>
}
