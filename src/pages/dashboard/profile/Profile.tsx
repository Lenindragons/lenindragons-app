/* eslint-disable @typescript-eslint/no-use-before-define */
import { useEffect, useState } from 'react'
import {
  Grid,
  Card,
  CardContent,
  Avatar,
  Typography,
  Box,
  Paper,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  FilledInput,
} from '@mui/material'
import { usePage } from '../../../context/PageContext'
import { useAuth } from '../../../context/AuthContext'
import { getSeasonResume } from '@/utils/getSeasonTotalValue'
import { getDocSeasonByType } from '@/services/events'

export const ProfilePage = () => {
  const { setTitle } = usePage()
  const { user } = useAuth()
  const [total, setTotal] = useState(0)
  const [score, setScore] = useState(0)
  const [season, setSeason] = useState<any>({
    season: { name: '', ranking: [] },
  })

  const getActualSeasonId = async () => {
    const docSeason = await getDocSeasonByType('season')
    return docSeason?.pop()?.id
  }

  useEffect(() => {
    setTitle('Seu Perfil')
    const fetchTotal = async () => {
      const id = await getActualSeasonId()
      const seasonResume = await getSeasonResume(id)
      setTotal(seasonResume.total)
      setScore(
        seasonResume.ranking.find((player: any) => {
          return player.email === user.email
        }).score
      )
      setSeason(seasonResume)
    }
    fetchTotal()
  }, [setTitle, user.email])

  const users = {
    name: user.name,
    email: user.email,
    avatarUrl: user.image,
    lastLoginAt: user.lastSignInTime,
    lastSignInTime: user.lastSignInTime,
    joinedDate: user.creationTime,
  }

  const isScoreMoreThan100 = score > 100
  const isUserInRanking = season?.ranking?.find(
    (player: any) => player.email === `${user.email}--`
  )

  return (
    <Box sx={{ padding: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Avatar
              alt={users.name}
              src={users.avatarUrl}
              sx={{
                width: 140,
                height: 140,
                margin: 'auto',
                backgroundColor: '#f0f0f0',
              }}
            />
            <Typography variant="h6" align="center" gutterBottom>
              {users.name}
            </Typography>
            <Typography variant="body2" align="center" color="textSecondary">
              {users.email}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Membro desde: {users.joinedDate}
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, marginTop: 2 }}>
                <Button variant="contained" color="primary">
                  Editar Perfil
                </Button>
                <Button variant="outlined" color="secondary">
                  Configurações
                </Button>
              </Box>
            </CardContent>
          </Card>
          {isUserInRanking && (
            <Card sx={{ mt: 2, p: 2 }}>
              <Box>
                <Typography variant="h6" gutterBottom>
                  Resumo da {season?.season.name}
                </Typography>
                <Grid container>
                  <Grid item md={12}>
                    <Typography variant="body1" gutterBottom>
                      <strong>Posição Geral no Ranking:</strong>{' '}
                      {isUserInRanking.place} lugar
                    </Typography>
                  </Grid>
                  <Grid item md={4}>
                    <FormControl sx={{ m: 1 }} variant="filled">
                      <InputLabel htmlFor="filled-adornment-amount">
                        Total acumulado da temporada
                      </InputLabel>
                      <FilledInput
                        id="outlined-adornment-amount"
                        disabled
                        value={total.toFixed(2)}
                        startAdornment={
                          <InputAdornment position="start">R$</InputAdornment>
                        }
                      />
                    </FormControl>
                  </Grid>
                  <Grid item md={4}>
                    <FormControl sx={{ m: 1 }}>
                      <InputLabel htmlFor="outlined-adornment-amount">
                        Total acumulado do jogador (Geral)
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-amount"
                        sx={{ width: '230px' }}
                        disabled
                        value={
                          isScoreMoreThan100
                            ? (score * 0.5).toFixed(2)
                            : score.toFixed(2)
                        }
                        startAdornment={
                          <InputAdornment position="start">R$</InputAdornment>
                        }
                        label="Total acumulado do jogador (Geral)"
                      />
                    </FormControl>
                  </Grid>
                  {isScoreMoreThan100 && (
                    <Grid item md={4}>
                      <FormControl sx={{ m: 1 }}>
                        <InputLabel htmlFor="outlined-adornment-amount">
                          Total acumulado do jogador (Produtos)
                        </InputLabel>
                        <OutlinedInput
                          id="outlined-adornment-amount"
                          disabled
                          value={(score * 0.5).toFixed(2)}
                          startAdornment={
                            <InputAdornment position="start">R$</InputAdornment>
                          }
                          label="Total acumulado do jogador"
                        />
                      </FormControl>
                    </Grid>
                  )}
                </Grid>
                * esses valores so podem ser utilizados apos o final da
                temporada
                {/* <Grid md={12} sx={{ mt: 2 }}>
                <ButtonGroup>
                  <Button
                    variant="contained"
                    color="success"
                    startIcon={<AttachMoney />}
                  >
                    Adicionar Saldo
                  </Button>
                </ButtonGroup>
              </Grid> */}
              </Box>
            </Card>
          )}
        </Grid>
      </Grid>
    </Box>
  )
}
