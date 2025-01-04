/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @typescript-eslint/no-shadow */
import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Timestamp } from 'firebase/firestore'
import { Avatar, Box, Grid, Paper, Typography } from '@mui/material'
import { WebPageTemplate } from '@/templates/webpage/WebPage'
import { getChallengeByDate } from '@/services/challenge'
import { getPlayers } from '@/services/players'
import { ProgressBar } from 'react-progressbar-fancy'

export const PlayerPage = () => {
  const { id } = useParams<{ id: string }>()
  const playerId = id || ''
  const [challenges, setChallenges] = useState([])
  const [players, setPlayers] = useState<any[]>([])

  useEffect(() => {
    const fetchChallenges = async () => {
      const actualDate = Timestamp.now()
      getChallengeByDate(actualDate, setChallenges)
    }

    const fetchPlayers = async () => {
      const allPlayers = (await getPlayers()) || []
      setPlayers(allPlayers)
    }

    fetchChallenges()
    fetchPlayers()
  }, [])

  const getSeasonChallenges = (challenges: any) => {
    if (!challenges || !challenges.length) {
      return []
    }

    return challenges
      .filter((challenge: any) => challenge.season)
      .filter((challenge: any) => challenge.season.type === 'season')
  }

  const getMatchesByPlayerId = (challenges: any, playerId: string) => {
    if (!challenges || !challenges.length) {
      return []
    }

    const seasonChallenges = getSeasonChallenges(challenges)

    const matches = seasonChallenges
      .map((challenge: any) => challenge.matches)

    return matches
      .flat()
      .filter((obj: any, index: number, self: any) => {
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
      })
      .filter((match: any) =>
        match?.players?.some((player: any) => player.id === playerId)
      )
  }

  const getPlayerImageById = (players: any, id: string) => {
    return players.find((player: any) => player.id === id)?.image
  }

  const getMatchesWithPlayerId = (challenges: any, playerId: string, profileId: string) => {
    if (!challenges || !challenges.length) {
      return []
    }

    return challenges
      .map((challenge: any) => challenge.matches)
      .flat()
      .filter((match: any) =>
        match?.players?.some((player: any) => player.id === playerId) &&
        match?.players?.some((player: any) => player.id === profileId)
      )
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

  const player = players.find((p) => p.id === playerId)

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
            <Avatar src={player?.image} sx={{ width: 150, height: 150 }} />
            <Typography variant="h3">{player?.name}</Typography>
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ marginTop: 2, width: '100%' }}>
          <Typography variant="h5">Ultimas matches</Typography>

          {getMatchesByPlayerId(challenges, playerId).map((match: any) => {
            return (
              <Grid item xs={12} key={match.id}>
                {getMatches(match)
                  .map((player: any) => (
                    <Paper key={player.id} sx={{ padding: 1 }}>
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
                                looses: getMatchesWithPlayerId(challenges, player.id, id || '')
                                  .filter((m: any) => m.result?.name === player.name).length,
                                ties: getMatchesWithPlayerId(challenges, player.id, id || '')
                                  .filter((m: any) => m.result === "tie").length,
                                wins: getMatchesWithPlayerId(challenges, player.id, id || '')
                                  .filter((m: any) => (m.result?.name !== player.name) && (m.result !== "tie")).length
                              })}
                              progressColor={"red"}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Paper>
                  ))}
              </Grid>
            )
          })}
        </Grid>
      </Box>
    </WebPageTemplate>
  )
}
