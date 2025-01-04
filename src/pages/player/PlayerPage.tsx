/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @typescript-eslint/no-shadow */
import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Timestamp } from 'firebase/firestore'
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Box, Grid, Paper, Typography } from '@mui/material'
import { WebPageTemplate } from '@/templates/webpage/WebPage'
import { getChallengeByDate } from '@/services/challenge'
import { getPlayers } from '@/services/players'
import { ProgressBar } from 'react-progressbar-fancy'
import ScoreBoard from './components/score-bar/ScoreBar'
import MatchList from './components/match-list/MatchList'

export const PlayerPage = () => {
  const { id } = useParams<{ id: string }>()
  const playerId = id || ''
  const [challenges, setChallenges] = useState([])
  const [players, setPlayers] = useState<any[]>([])

  useEffect(() => {
    // busca os ultimos challenges existentes de temporadas vigentes
    const fetchChallenges = async () => {
      const actualDate = Timestamp.now()
      getChallengeByDate(actualDate, setChallenges)
    }

    // busca todos os jogadores cadastrados
    const fetchPlayers = async () => {
      const allPlayers = (await getPlayers()) || []
      setPlayers(allPlayers)
    }

    fetchChallenges()
    fetchPlayers()
  }, [])

  // filtra para que apenas existam challenges de temporada
  const getSeasonChallenges = (challenges: any) => {
    if (!challenges || !challenges.length) {
      return []
    }

    return challenges
      .filter((challenge: any) => challenge.season)
      .filter((challenge: any) => challenge.season.type === 'season')
  }

  const filterByPlayerName = (obj: any, index: number, self: any) => {
    const normalizedPlayers = JSON.stringify(
      obj.players.map((player: any) =>
        typeof player === "string" ? player : player.name
      ).sort()
    )

    return index === self.findIndex((o: any) => {
      const normalized = JSON.stringify(
        o.players.map((player: any) =>
          typeof player === "string" ? player : player.name
        ).sort()
      )
      return normalized === normalizedPlayers
    })
  }

  const filterByPlayerId = (playerId: string) => (match: any) =>
    match?.players?.some((player: any) => player.id === playerId)

  const filterSameMatch = (playerId: string, profileId: string) => (match: any) =>
    match?.players?.some((player: any) => player.id === playerId) &&
    match?.players?.some((player: any) => player.id === profileId)



  const getMatchesByPlayerId = (challenges: any, playerId: string) => {
    if (!challenges || !challenges.length) {
      return []
    }

    const seasonChallenges = getSeasonChallenges(challenges)

    const seasonMatches = seasonChallenges
      .map((challenge: any) => {
        const dates = challenge.dates
        const matches = challenge.matches.map((match: any) => {
          return { ...match, dates }
        })
        return matches
      })

    return seasonMatches
      .flat()
      .filter(filterByPlayerName)
      .filter(filterByPlayerId(playerId))
  }

  const getPlayerImageById = (players: any, id: string) => {
    return players.find((player: any) => player.id === id)?.image
  }

  const getMatchesWithPlayerId = (challenges: any, playerId: string, profileId: string) => {
    if (!challenges || !challenges.length) {
      return []
    }

    return challenges
      .map((challenge: any) => {
        const date = challenge.dates[0].startDate
        const matches = challenge.matches.map((match: any) => {
          return { ...match, date }
        })
        return matches
      })
      .flat()
      .filter(filterSameMatch(playerId, profileId))
  }

  const calculatePerformance = ({ wins, looses, ties }: any) => {
    const totalGames = wins + looses + ties

    if (totalGames === 0) return 50

    const performanceA = ((wins + ties / 2) / totalGames) * 100

    return parseFloat(performanceA.toFixed(2))
  }

  const getMatches = (match: any) => {
    const result = match.players
      .filter((player: any) => player.id !== id)
      .filter((player: any) => player !== 'bye')
    return result
  }

  const profilePlayer = players.find((p) => p.id === playerId)

  const getResult = (challenges: any, player: any, id: string, callback: any) =>
    getMatchesWithPlayerId(challenges, player.id, id || '')
      .filter(callback).length

  return (
    <WebPageTemplate>
      <Box component={Paper} p={3} sx={{ mt: 3, textAlign: 'center' }}>
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar src={profilePlayer?.image} sx={{ width: 150, height: 150 }} />
            <Typography variant="h3">{profilePlayer?.name}</Typography>
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ marginTop: 2, width: '100%' }}>
          {getMatchesByPlayerId(challenges, playerId).map((match: any) => {
            return (
              <Grid item xs={12} key={match.id}>
                {getMatches(match)
                  .map((player: any) => (

                    <Grid container>
                      <Grid
                        item
                        xs={12}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          flexWrap: 'wrap',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Accordion sx={{ width: '100%' }}>
                          <AccordionSummary>
                            <Grid container xs={6} sx={{ alignItems: 'center', gap: 2 }}>
                              <Avatar
                                src={getPlayerImageById(players, player.id)}
                                sx={{ width: 50, height: 50 }}
                              />
                              <Typography>
                                <Link style={{ color: 'black' }} to={`/profile/player/${player?.id}`}>
                                  {player.name}
                                </Link>
                              </Typography>
                            </Grid>
                            <Grid xs={6}>
                              <ProgressBar
                                label={`Total de partidas na temporada: ${getMatchesWithPlayerId(challenges, player.id, id || '').length}`}
                                score={calculatePerformance({
                                  looses: getResult(challenges, player, id || '', (m: any) => m.result?.name === player.name),
                                  ties: getResult(challenges, player, id || '', (m: any) => m.result === "tie"),
                                  wins: getResult(challenges, player, id || '', (m: any) => (m.result?.name !== player.name) && (m.result !== "tie"))
                                })}
                                progressColor={"red"}
                              />
                            </Grid>
                          </AccordionSummary>
                          <AccordionDetails>
                            <ScoreBoard {...{
                              losses: getResult(challenges, player, id || '', (m: any) => m.result?.name === player.name),
                              draws: getResult(challenges, player, id || '', (m: any) => m.result === "tie"),
                              wins: getResult(challenges, player, id || '', (m: any) => (m.result?.name !== player.name) && (m.result !== "tie"))
                            }} />

                            <MatchList
                              profilePlayerName={profilePlayer?.name}
                              playerName={player?.name}
                              matches={getMatchesWithPlayerId(challenges, player.id, id || '')}
                            />
                          </AccordionDetails>
                        </Accordion>
                      </Grid>
                    </Grid>
                  ))}
              </Grid>
            )
          })}
        </Grid>
      </Box>
    </WebPageTemplate>
  )
}
