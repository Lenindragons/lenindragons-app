/* eslint-disable react/no-danger */
/* eslint-disable react/jsx-key */
/* eslint-disable prettier/prettier */
import { ReactNode, useEffect, useState } from 'react'
import { Box, Grid, Tab, Tabs, Typography } from '@mui/material'
import DOMPurify from 'dompurify'
import { getEventsByType } from '@/services/events'
import { getChallengeBySeasonId } from '@/services/challenge'
import { getRanking } from './getRanking'
import { RankingTable } from '../ranking-table'
import { Loading } from '@/components/commons/loading/Loading'

export const RankingList = ({ type = 'season' }: { type: string }) => {
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
      getEventsByType(setSeasons, type)
    }
    fetchSeasons()
  }, [type])

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

  if (!seasons.length) {
    return (
      <div
        style={{
          height: '500px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Loading />
      </div>
    )
  }

  return (
    <Box style={{ width: '100%', marginTop: '50px' }}>
      <Grid container spacing={4} gap={0}>
        <Grid item xs={8}>
          <Tabs value={value} onChange={handleChange} aria-label='Rankings tabs'>
            {seasons.map((season) => (
              <Tab label={season.name} style={{ padding: 10 }} key={season.id} />
            ))}
          </Tabs>
          <RankingTable rows={rows} />
        </Grid>
        <Grid item xs={4}>
          <div style={{ marginTop: '50px' }}>
            <Typography variant="h6">{getSeasonContent()?.name}</Typography>
            <div style={{ marginTop: '20px', padding: '20px' }} dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(getSeasonContent()?.description)
            }} />
          </div>
        </Grid>
      </Grid>

    </Box>
  )
}
