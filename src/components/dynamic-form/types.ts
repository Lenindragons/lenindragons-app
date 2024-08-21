import { Pokemon } from '../../pages/challenge/hooks/player-list/types'

export type Player = {
  email: string
  name: string
  id: string
}

export type PlayerItemDynamyc = {
  place: number
  player: Player
  wins: number
  looses: number
  ties: number
  deck: {
    icons: Pokemon[]
    name: string
    id: string
  }
}

export type FormValues = {
  players: PlayerItemDynamyc[]
}
