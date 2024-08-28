import { Timestamp } from 'firebase/firestore'
import { Event, EventDate } from './Event'
import { PlayerItem } from '../pages/challenge/hooks/player-list/types'

export type Challenge = {
  rounds: number
  roundTime: number
  event: Event
  dates: EventDate[] | string | any
  created: Timestamp
}

export type ChallengeResult = {
  challenge: {
    result: PlayerItem[]
  }
}

export type Season = {
  name: string
  dates: EventDate[]
}

export type ChallengeListDetail = Challenge &
  ChallengeResult & {
    season: Season
  }
