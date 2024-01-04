export type Date = {
  endDate: Date
  startDate: Date
  key: string
}

export type Event = {
  name: string
  image: File
  description: string
  dates: Array<Date>
}
