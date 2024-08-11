export type Pokemon = {
  name: string
  type: string
}

export interface PlayerItem {
  place: number
  name: string
  wins: number
  looses: number
  ties: number
  deck: Pokemon[]
}

export interface PlayerItemsContextType {
  playerItems: PlayerItem[]
  addPlayerItem: (playerItems: PlayerItem[]) => void
  hasFinished: boolean
  setHasFinished: React.Dispatch<React.SetStateAction<boolean>>
  setId: React.Dispatch<React.SetStateAction<string>>
}
