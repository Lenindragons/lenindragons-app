// PlayerItemsContext.tsx
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react'
import { PlayerItem, PlayerItemsContextType } from './types'
import { getChallengeById } from '@/services/challenge'

const PlayerItemsContext = createContext<PlayerItemsContextType | undefined>(
  undefined
)

const getLocalStatusFinished = (id: string) => {
  const { localStatusFinished } = JSON.parse(
    localStorage.getItem(id) ?? '{"localStatusFinished": false}'
  )
  return localStatusFinished
}

export const PlayerItemsProvider = ({ children }: { children: ReactNode }) => {
  const [playerItems, setPlayerItems] = useState<PlayerItem[]>([])
  const [id, setId] = useState<string>('')
  const [challenge, setChallenge] = useState<any>({})
  const [hasFinished, setStatusFinished] = useState<boolean>(
    getLocalStatusFinished(id)
  )

  const addPlayerItem = (items: PlayerItem[]) => {
    setPlayerItems(items)
  }

  useEffect(() => {
    setStatusFinished(getLocalStatusFinished(id))
  }, [id])

  useEffect(() => {
    const fetchGetPlayerItems = async () => {
      if (id) {
        const challenges = await getChallengeById(id)
        setChallenge(challenges)
        setPlayerItems(challenges?.challenge?.result || [])
      }
    }
    fetchGetPlayerItems()
  }, [id])

  const setHasFinished = (status: boolean) => {
    setStatusFinished(status)
    const localStatusFinished = getLocalStatusFinished(id)
    if (!localStatusFinished) {
      localStorage.setItem(
        JSON.stringify(id),
        JSON.stringify({ localStatusFinished: true })
      )
    }
  }

  return (
    <PlayerItemsContext.Provider
      value={{
        playerItems,
        addPlayerItem,
        challenge,
        setHasFinished,
        hasFinished,
        setId,
      }}
    >
      {children}
    </PlayerItemsContext.Provider>
  )
}

export const usePlayerItem = (id: string): PlayerItemsContextType => {
  const context = useContext(PlayerItemsContext)
  if (!context) {
    throw new Error('usePlayerItem must be used within a PlayerItemsProvider')
  }

  context.setId(id)
  return context
}
