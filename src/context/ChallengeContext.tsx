import { createContext, useContext, useEffect, useState } from 'react'
import { GridSelectionModel } from '@material-ui/data-grid'

import { ContextProps } from './ContextProps'
import {
  getChallenges,
  deleteChallenge,
  updateChallenge,
} from '../services/challenge'
import { Challenge } from '../types/Challenge'

const ChallengeContext = createContext({})

export const ChallengeProvider = ({ children }: ContextProps) => {
  const [seasonId, setSeasonId] = useState('')
  const [challenges, setChallenges] = useState<Challenge[]>([])
  const [items, setItems] = useState<GridSelectionModel>([])

  const onSelectionModelChange = (ids: GridSelectionModel) => {
    setItems(ids)
  }

  const removeChallenge = async (id: string) => {
    deleteChallenge(id)
    setItems(items.filter((item) => item !== id))
  }

  const editChallenge = (id: string, newChallengeData: any) => {
    updateChallenge(id, newChallengeData)
  }

  useEffect(() => {
    getChallenges(setChallenges, seasonId)
  }, [seasonId])

  return (
    <ChallengeContext.Provider
      value={{
        challenges,
        items,
        onSelectionModelChange,
        removeChallenge,
        editChallenge,
        setSeasonId,
      }}
    >
      {children}
    </ChallengeContext.Provider>
  )
}

export const useChallenges = (): any => {
  return useContext(ChallengeContext)
}
