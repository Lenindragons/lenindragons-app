/* eslint-disable react/jsx-key */
/* eslint-disable prettier/prettier */
import { DataGrid, GridAlignment } from '@material-ui/data-grid'
import { ReactNode, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Box, Tab, Tabs } from '@mui/material'
import { getEvents } from '../../../../services/events'
import { getChallengeBySeasonId } from '../../../../services/challenge'
import { getRanking } from './getRanking'

const DataGridContainer = styled.div`
  .data-grid-header * {
    font-weight: bold !important;
  }
  
  .MuiDataGrid-row:nth-child(1),
  .MuiDataGrid-row:nth-child(2),
  .MuiDataGrid-row:nth-child(3) {
    background-color: #eee;
    font-weight: bold;
    color: #777 !important;
  } 
`

const columnConfig = {
  align: 'center' as GridAlignment,
  headerAlign: 'center' as GridAlignment,
  sortable: false,
  editable: false,
  filterable: false,
  hideSortIcons: true,
  hide: false,
  disableReorder: true,
  disableColumnMenu: true,
  headerClassName: 'data-grid-header',
}

const columns = [
  {
    field: 'id',
    headerName: 'ID',
    width: 90,
    ...columnConfig,
    hide: true
  },
  {
    field: 'place',
    headerName: 'Posição',
    width: 130,
    ...columnConfig,
  },
  {
    field: 'name',
    headerName: 'Jogador',
    width: 350,
    ...columnConfig,
  },
  {
    field: 'points',
    headerName: 'Pontos',
    type: 'number',
    width: 200,
    ...columnConfig,
    flex: 1,
  }
]

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
      console.log(getRanking(challenges || []))
      setRows(getRanking(challenges || []))
    }
  }, [challenges])

  const handleChange = (_e: React.SyntheticEvent, newValue: number) => {
    setSeasonSelected(seasons[newValue]?.id)
    setValue(newValue)
  }

  return (
    <>
      <Box>
        <Tabs value={value} onChange={handleChange} aria-label='Rankings tabs'>
          {seasons.map((season) => (
            <Tab label={season.name} style={{ padding: 10 }} key={season.id} />
          ))}
        </Tabs>
      </Box>
      <DataGridContainer style={{ height: 500, width: '100%', marginBottom: 200 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={20}
        />
      </DataGridContainer>
    </>
  )
}
