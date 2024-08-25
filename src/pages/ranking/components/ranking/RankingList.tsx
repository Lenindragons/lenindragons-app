/* eslint-disable react/no-danger */
/* eslint-disable react/jsx-key */
/* eslint-disable prettier/prettier */
import { ReactNode, useEffect, useState } from 'react'
import { Box, Tab, Tabs, Typography } from '@mui/material'
import DOMPurify from 'dompurify'
import { getEvents } from '@/services/events'
import { getChallengeBySeasonId } from '@/services/challenge'
import { getRanking } from './getRanking'
import { RankingTable } from '../ranking-table'

export const RankingList = () => {
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
    <Box style={{ width: '100%' }}>
      <header>
        <Typography variant="h4">{getSeasonContent()?.name}</Typography>
      </header>
      <Tabs value={value} onChange={handleChange} aria-label='Rankings tabs'>
        {seasons.map((season) => (
          <Tab label={season.name} style={{ padding: 10 }} key={season.id} />
        ))}
      </Tabs>
      <RankingTable rows={rows} />

      <div style={{ marginTop: '20px', padding: '20px' }} dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(getSeasonContent()?.description)
      }} />
    </Box>
  )
}
