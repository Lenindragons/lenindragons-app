import {
  Box,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { getEvents } from '../../../../services/events'
import { getChallengeBySeasonId } from '../../../../services/challenge'

export const ResultsList = () => {
  const [seasons, setSeasons] = useState([])
  const [challenges, setChallenges] = useState([])
  const [seasonSelected, setSeasonSelected] = useState('')

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
      console.log(challenges)
    }
  }, [seasonSelected])

  const handleChange = (_e: React.SyntheticEvent, newValue: string) => {
    setSeasonSelected(newValue)
  }

  const tableHeadStyle: React.CSSProperties = {
    textAlign: 'center',
    fontWeight: 'bold',
  }

  return (
    <div style={{ height: '1000px' }}>
      <Box>
        <Tabs value={seasonSelected} onChange={handleChange}>
          {seasons.map((season: { name: string; id: string }) => (
            <Tab label={season.name} style={{ padding: 10 }} key={season.id} />
          ))}
        </Tabs>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={tableHeadStyle}>Data</TableCell>
                <TableCell style={tableHeadStyle}>Tempo de Rodada</TableCell>
                <TableCell style={tableHeadStyle}>Rodadas</TableCell>
                <TableCell style={tableHeadStyle}>Jogadores</TableCell>
                <TableCell style={tableHeadStyle}>Vencedor</TableCell>
                <TableCell style={tableHeadStyle}>Deck</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {challenges
                .filter((c) => !!c?.challenge?.result)
                .map((challenge: any) => (
                  <TableRow key={challenge.id} style={{ textAlign: 'center' }}>
                    <TableCell style={{ textAlign: 'center' }}>date</TableCell>
                    <TableCell style={{ textAlign: 'center' }}>
                      {challenge.roundTime}
                    </TableCell>
                    <TableCell style={{ textAlign: 'center' }}>
                      {challenge.rounds}
                    </TableCell>
                    <TableCell style={{ textAlign: 'center' }}>
                      {challenge.challenge.result.length}
                    </TableCell>
                    <TableCell style={{ textAlign: 'center' }}>
                      {
                        challenge.challenge.result.find((p) => p.place === '1')
                          .name
                      }
                    </TableCell>
                    <TableCell style={{ textAlign: 'center' }}>
                      {challenge.challenge.result
                        .find((p) => p.place === '1')
                        .deck.map((pokemon) => (
                          <img
                            height={55}
                            src={pokemon.url}
                            alt={pokemon.name}
                          />
                        ))}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  )
}
