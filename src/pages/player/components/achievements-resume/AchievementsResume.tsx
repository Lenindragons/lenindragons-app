/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @typescript-eslint/no-shadow */
import { Link } from 'react-router-dom'
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Box, Grid, Paper, Typography } from '@mui/material'
import { ProgressBar } from 'react-progressbar-fancy'
import { Suspense, lazy } from 'react'

const DeckListHistory = lazy(() => import('../deck-list-history/DeckListHistory'))
const ChallengeHistory = lazy(() => import('../challenge-history/ChallengeHistory'))
const ScoreBoard = lazy(() => import('../score-bar/ScoreBar'))
const MatchList = lazy(() => import('../match-list/MatchList'))

import {
  calculatePerformance,
  getMatches,
  getMatchesByPlayerId,
  getMatchesWithPlayerId,
  getPlayerImageById,
  getResult
} from './utils'

const AchievementsResume = ({
  profilePlayer,
  challenges,
  playerId,
  id,
  players
}: any) => {

  return (
    <Box component={Paper} p={3} sx={{ textAlign: 'center' }}>
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

      <Grid container spacing={2} sx={{ mt: 3 }}>

        <Grid item xs={6}>
          <Suspense fallback={<div>Loading...</div>}>
            <Typography variant='h5' sx={{ margin: '10px 0' }}>
              Ultimos Decks
            </Typography>

            <DeckListHistory challenges={challenges} playerId={profilePlayer?.id} />
          </Suspense>
        </Grid>

        <Grid item xs={6}>
          <Suspense fallback={<div>Loading...</div>}>
            <Typography variant='h5' sx={{ margin: '10px 0' }}>
              Historico de partidas
            </Typography>
            <ChallengeHistory challenges={challenges || []} playerId={profilePlayer?.id} />
          </Suspense>
        </Grid>
      </Grid>


      <Typography variant='h5' sx={{ margin: '10px 0' }}>
        Ultimas Matches
      </Typography>
      <Grid container spacing={2} sx={{ width: '100%' }}>
        <Suspense fallback={<div>Loading...</div>}>
          {getMatchesByPlayerId(challenges, playerId).map((match: any) => {
            return (
              <Grid item xs={12} key={match.id}>
                {getMatches(match, id)
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
                        <Accordion sx={{ width: '100%' }} elevation={3}>
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
                                label={`Total de partidas na tircuito: ${getMatchesWithPlayerId(challenges, player.id, id || '').length}`}
                                score={calculatePerformance({
                                  losses: getResult(challenges, player, id || '', (m: any) => m.result?.name === player.name),
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
        </Suspense>
      </Grid>
    </Box>

  )
}

export default AchievementsResume
