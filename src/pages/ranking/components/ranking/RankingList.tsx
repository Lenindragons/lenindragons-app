/* eslint-disable react/no-danger */
/* eslint-disable react/jsx-key */
/* eslint-disable prettier/prettier */
import { ReactNode, useEffect, useState } from 'react'
import { Box, Collapse, Grid, IconButton, Paper, Tab, Tabs, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DOMPurify from 'dompurify'
import styled from 'styled-components'
import { getEventsByType } from '@/services/events'
import { getChallengeBySeasonId } from '@/services/challenge'
import { getRanking } from './getRanking'
import { RankingTable } from '../ranking-table'
import { Loading } from '@/components/commons/loading/Loading'
import { getPlayers } from '@/services/players';

const RulesBox = styled.div`
  marginTop: 20px;
  padding: 20px;

  h2, h3, h4, h5, h6 {
    margin: 20px 0;
  }

  ul {
    padding-left: 20px;
    list-style-type: disc;
    margin: 10px 0;

    li {
      margin-bottom: 5px;
    }
  }

  table {
    width: 100%;
    border-collapse: separate;
    border: 1px solid #ddd !important;
    margin: 20px 0;

    th {
      background-color: #f8f8f8;
      color: #333;
      text-align: left;
      padding: 12px;
      border-bottom: 2px solid #ddd;
    }

    td {
      padding: 10px;
      border-bottom: 1px solid #f0f0f0;
    }

    tr:nth-child(even) {
      background-color: #f9f9f9;
    }

    tr:hover {
      background-color: #f1f1f1;
    }
  }
`

export const RankingList = ({ type = 'season' }: { type: string }) => {
  const [seasons, setSeasons] = useState<{
    dates: { endDate: string }[]
    name: ReactNode
    id: string
  }[]>([])
  const [seasonSelected, setSeasonSelected] = useState('')
  const [challenges, setChallenges] = useState([])
  const [rows, setRows] = useState([])
  const [value, setValue] = useState(0)
  const [players, setPlayers] = useState<any>([])
  const [collapseOpen, setCollapseOpen] = useState(false)

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

  useEffect(() => {
    const fetchPlayers = async () => {
      const storedPlayers = await getPlayers()
      setPlayers(storedPlayers)
    }

    fetchPlayers()
  }, [])

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
      setRows(getRanking(challenges || [], players))
    }
  }, [challenges])

  const handleChange = (_e: React.SyntheticEvent, newValue: number) => {
    setSeasonSelected(seasons[newValue]?.id)
    setValue(newValue)
  }

  const handleCollapseToggle = () => {
    setCollapseOpen(!collapseOpen);
  };

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

  const gridSize = 12
  const currentDate = new Date()

  return (
    <Box style={{ width: '100%', marginTop: '50px' }}>
      <Grid item xs={12} sm={4}>

        <Box component={Paper} style={{ padding: 10, marginBottom: 10 }}>
          <Typography variant="h6">
            REGRAS DA TEMPORADA
            <IconButton onClick={handleCollapseToggle}>
              <ExpandMoreIcon />
            </IconButton>
          </Typography>
        </Box>

        <Collapse in={collapseOpen}>
          <RulesBox>
            <div
              style={{ marginTop: '5px' }}
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(getSeasonContent()?.description),
              }}
            />
          </RulesBox>
        </Collapse>
      </Grid>
      <Grid container spacing={4} gap={0}>
        <Grid item xs={gridSize}>
          <Tabs value={value} onChange={handleChange} aria-label='Rankings tabs'>
            {seasons.filter((season: any) => season.dates[0].endDate.toDate() >= currentDate).map((season) => (
              <Tab label={season.name} style={{ padding: 10 }} key={season.id} />
            ))}
          </Tabs>
          <RankingTable rows={rows} players={players} />
        </Grid>
      </Grid>
    </Box>
  )
}
