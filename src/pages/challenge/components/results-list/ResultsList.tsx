/* eslint-disable react/jsx-key */
import {
  Box,
  keyframes,
  Paper,
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
import { Link } from 'react-router-dom'
import { getEvents } from '@/services/events'
import { getChallengeBySeasonId } from '@/services/challenge'
import { getDate } from '@/helpers/format-date'
import { ChallengeResult } from '@/types/Challenge'
import useIsMobile from '@/helpers/is-mobile'
import { Loading } from '@/components/commons/loading/Loading'

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

export const ResultsList = ({ type = 'season' }: { type: string }) => {
  const [seasons, setSeasons] = useState<{ name: string; id: string }[]>([])
  const [challenges, setChallenges] = useState([])
  const [seasonSelected, setSeasonSelected] = useState('')
  const [value, setValue] = useState(0)
  const isMobile = useIsMobile()

  useEffect(() => {
    const fetchSeasons = async () => {
      getEvents(setSeasons, type)
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
  }, [challenges, seasonSelected])

  const handleChange = (_e: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
    setSeasonSelected(seasons[newValue]?.id)
  }

  const tableHeadStyle: React.CSSProperties = {
    textAlign: 'center',
    fontWeight: 'bold',
  }

  if (!challenges.length) {
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
    <div style={{ width: '100%' }}>
      <Box>
        <>
          <Tabs value={value} onChange={handleChange}>
            {seasons.map((season: { name: string; id: string }) => (
              <Tab
                label={season.name}
                style={{ padding: 10 }}
                key={season.id}
              />
            ))}
          </Tabs>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={tableHeadStyle}>Data</TableCell>
                  {!isMobile && (
                    <>
                      <TableCell style={tableHeadStyle}>
                        Tempo de Rodada
                      </TableCell>
                      <TableCell style={tableHeadStyle}>Rodadas</TableCell>
                      <TableCell style={tableHeadStyle}>Jogadores</TableCell>
                    </>
                  )}
                  <TableCell style={tableHeadStyle}>Vencedor</TableCell>
                  <TableCell style={tableHeadStyle}>Deck</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {challenges
                  .filter((c: ChallengeResult) => !!c?.challenge?.result)
                  .map((challenge: any, index: number) => (
                    <TableRow
                      key={challenge.id}
                      sx={{
                        opacity: 0,
                        animation: `${fadeIn} 0.5s forwards`,
                        animationDelay: `${(index as number) * 0.1}s`,
                        textAlign: 'center',
                      }}
                    >
                      <TableCell style={{ textAlign: 'center' }}>
                        <Link
                          to={`/challenge/${challenge.id}`}
                          style={{ textDecoration: 'none' }}
                        >
                          {getDate(challenge.dates[0].startDate, 'dd MMM yyyy')}
                        </Link>
                      </TableCell>
                      {!isMobile && (
                        <>
                          <TableCell style={{ textAlign: 'center' }}>
                            {challenge.roundTime}
                          </TableCell>
                          <TableCell style={{ textAlign: 'center' }}>
                            {challenge.rounds}
                          </TableCell>
                          <TableCell style={{ textAlign: 'center' }}>
                            {challenge.challenge.result.length}
                          </TableCell>
                        </>
                      )}
                      <TableCell style={{ textAlign: 'center' }}>
                        {
                          challenge.challenge.result.find(
                            (p: { place: string }) => p.place === '1'
                          ).name
                        }
                      </TableCell>
                      <TableCell style={{ textAlign: 'center' }}>
                        {challenge.challenge.result
                          .find((p: { place: string }) => p.place === '1')
                          .deck.icons.map(
                            (pokemon: {
                              url: string | undefined
                              name: string | undefined
                            }) => (
                              <img
                                height={55}
                                src={pokemon.url}
                                alt={pokemon.name}
                              />
                            )
                          )}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      </Box>
    </div>
  )
}
