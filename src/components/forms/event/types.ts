export type Date = {
  endDate: Date
  startDate: Date
  key: string
}

export type Event = {
  name: string
  image: string
  description: string
  dates: Array<Date>
}
