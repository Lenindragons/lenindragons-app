/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @typescript-eslint/no-shadow */
import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Timestamp } from 'firebase/firestore'
import { Avatar, Box, Grid, Paper, Typography } from '@mui/material'
import { WebPageTemplate } from '@/templates/webpage/WebPage'
import { getChallengeByDate } from '@/services/challenge'
import { getPlayers } from '@/services/players'

export const PlayerPage = () => {
  const { id } = useParams<{ id: string }>()
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

    return seasonChallenges
      .map((challenge: any) => challenge.matches)
      .flat()
      .filter((match: any) =>
        match?.players?.some((player: any) => player.id === playerId)
      )
  }

  const getPlayersWithPhoto = (players: any) => {
    return players.filter((player: any) => player.image)
  }

  const getPlayerImageById = (players: any, id: string) => {
    return players.find((player: any) => player.id === id)?.image
  }

  const player = players.find((p) => p.id === id)

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

          {getMatchesByPlayerId(challenges, id).map((match: any) => {
            return (
              <Grid item xs={12} key={match.id}>
                {match.players
                  .filter((player) => player.id !== id)
                  .filter((player) => player !== 'bye')
                  .map((player: any) => (
                    <Paper key={player.id} sx={{ padding: 1 }}>
                      <Grid container>
                        <Grid
                          item
                          xs={6}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                          }}
                        >
                          <Avatar
                            src={getPlayerImageById(players, player.id)}
                            sx={{ width: 50, height: 50 }}
                          />
                          <Typography>
                            <Link to={`/profile/player/${player?.id}`}>
                              {player.name}
                            </Link>
                          </Typography>
                        </Grid>
                      </Grid>
                    </Paper>
                  ))}
              </Grid>
            )
          })}
        </Grid>
        {/* {getMatchesByPlayerId(challenges, id).map((match: any) => {
          return (
            <div key={match.id}>
              <p>{match.id}</p>
              <div style={{ display: 'flex' }}>
                {match.players
                  .filter((player) => player.id !== id)
                  .map((player: any) => (
                    <div key={player.id} style={{ padding: 10 }}>
                      <figure>
                        <img src={players.find((p) => p.id === id)?.image} />
                      </figure>
                      <div
                        style={{
                          padding: 10,
                          border: '1px solid red',
                        }}
                      >
                        {player.name}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )
        })} */}

        {/* <h2>Players</h2>
        <ul>{JSON.stringify(getPlayersWithPhoto(players))}</ul> */}
      </Box>
    </WebPageTemplate>
  )
}
