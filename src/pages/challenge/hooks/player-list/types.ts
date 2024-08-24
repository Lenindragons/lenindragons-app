import { EventDate } from '@/types/Event'

export type Pokemon = {
  url: string | undefined
  name: string
  type: string
}

export interface PlayerItem {
  place: number
  name: string
  wins: number
  looses: number
  ties: number
  deck: {
    icons: Pokemon[]
    name: string
    id: string
  }
}

type Challenge = {
  challenge: {
    result: PlayerItem[]
  }
  dates: EventDate[]
  season: {
    name: string
  }
}

export interface PlayerItemsContextType {
  playerItems: PlayerItem[]
  challenge: Challenge
  addPlayerItem: (playerItems: PlayerItem[]) => void
  hasFinished: boolean
  setHasFinished: (x: boolean) => void
  setId: React.Dispatch<React.SetStateAction<string>>
}
