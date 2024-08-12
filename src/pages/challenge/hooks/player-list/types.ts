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
  deck: Pokemon[]
}

export interface PlayerItemsContextType {
  playerItems: PlayerItem[]
  addPlayerItem: (playerItems: PlayerItem[]) => void
  hasFinished: boolean
  setHasFinished: (x: boolean) => void
  setId: React.Dispatch<React.SetStateAction<string>>
}
