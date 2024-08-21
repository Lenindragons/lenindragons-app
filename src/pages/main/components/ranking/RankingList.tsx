/* eslint-disable react/jsx-key */
/* eslint-disable prettier/prettier */
import { ReactNode, useEffect, useState } from 'react'
import { Box, Tab, Tabs } from '@mui/material'
import { getEvents } from '../../../../services/events'
import { getChallengeBySeasonId } from '../../../../services/challenge'
import { getRanking } from './getRanking'
import { RankingTable } from '../ranking-table'

export default function DataGridDemo() {
  const [seasons, setSeasons] = useState<{
    name: ReactNode
    id: string
  }[]>([])
  const [seasonSelected, setSeasonSelected] = useState('')
  const [challenges, setChallenges] = useState([])
  const [rows, setRows] = useState([])
  const [value, setValue] = useState(0)

  useEffect(() => {
    const fetchSeasons = async () => {
      getEvents(setSeasons)
    }
    fetchSeasons()
  }, [])

  useEffect(() => {
    if (seasons.length) {
      setSeasonSelected(seasons[0].id)
    }
  }, [seasons])

  const fetchChallenges = (seasonId: string) => {
    getChallengeBySeasonId(seasonId, setChallenges)
  }

  useEffect(() => {
    if (seasonSelected) {
      fetchChallenges(seasonSelected)
    }
  }, [
    seasonSelected
  ])

  useEffect(() => {
    if (challenges.length) {
      setRows(getRanking(challenges || []))
    }
  }, [challenges])

  const handleChange = (_e: React.SyntheticEvent, newValue: number) => {
    setSeasonSelected(seasons[newValue]?.id)
    setValue(newValue)
  }

  const getSeasonContent = () => {
    const seasonSelectedByUser = seasons.find(s => s.id === seasonSelected)
    return seasonSelectedByUser || { name: '', description: '' } as any
  }

  return (
    <>
      <header>
        <h1>{getSeasonContent()?.name}</h1>
        <h2>{getSeasonContent()?.description}</h2>
      </header>
      <Box>
        <Tabs value={value} onChange={handleChange} aria-label='Rankings tabs'>
          {seasons.map((season) => (
            <Tab label={season.name} style={{ padding: 10 }} key={season.id} />
          ))}
        </Tabs>
      </Box>
      <RankingTable rows={rows} />
    </>
  )
}
