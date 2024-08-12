import { Timestamp } from 'firebase/firestore'
import { Event, EventDate } from './Event'
import { PlayerItem } from '../pages/challenge/hooks/player-list/types'

export type Challenge = {
  rounds: number
  roundTime: number
  event: Event
  dates: EventDate
  created: Timestamp
}

export type ChallengeResult = {
  challenge: {
    result: PlayerItem[]
  }
}
