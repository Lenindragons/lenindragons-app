/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-shadow */
import { createContext, useContext, useEffect, useState } from 'react'
import { GridSelectionModel } from '@material-ui/data-grid'

import { ContextProps } from './ContextProps'
import {
  getChallenges,
  deleteChallenge,
  updateChallenge,
  getAllChallenges,
} from '../services/challenge'
import { Challenge } from '../types/Challenge'
import { getSeasonResume } from '@/pages/dashboard/report/utils/getSeasonResume'

const ChallengeContext = createContext({})

export const ChallengeProvider = ({ children }: ContextProps) => {
  const [seasonId, setSeasonId] = useState('')
  const [challenges, setChallenges] = useState<Challenge[]>([])
  const [allChallenges, setAllChallenges] = useState<Challenge[]>([])
  const [mappedChallenges, setMappedChallenges] = useState<any[]>([])
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

  const getChallengeById = async (id: string) => {
    return challenges.find((challenge: any) => challenge?.id === id)
  }

  useEffect(() => {
    seasonId && getChallenges(setChallenges, seasonId)
  }, [seasonId])

  useEffect(() => {
    const fetchChallenges = async () => {
      await getAllChallenges(setAllChallenges)
    }

    fetchChallenges()
  }, [])

  useEffect(() => {
    const challengesChanges = () => {
      setMappedChallenges(getSeasonResume(allChallenges))
    }
    challengesChanges()
  }, [allChallenges, setMappedChallenges])

  const getMappedChallengeById = (id: string) => {
    return mappedChallenges.find((challenge: any) => challenge?.id === id)
  }

  return (
    <ChallengeContext.Provider
      value={{
        challenges,
        items,
        getChallengeById,
        onSelectionModelChange,
        removeChallenge,
        editChallenge,
        setSeasonId,
        mappedChallenges,
        setMappedChallenges,
        getMappedChallengeById,
      }}
    >
      {children}
    </ChallengeContext.Provider>
  )
}

export const useChallenges = (): any => {
  return useContext(ChallengeContext)
}
