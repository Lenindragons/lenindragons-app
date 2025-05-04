import DateRangeComponent from "@/components/commons/date-range/Daterage"
import { formatDate, getDate } from "@/helpers/format-date"
import { getAchievements } from "@/services/achievements"
import { getPlayerById, removePlayerAchievement, updatePlayerAchievement } from "@/services/players"
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { Controller, useForm, useWatch } from "react-hook-form"
import { useParams } from "react-router-dom"
import Dialog from '@/components/simple-dialog'

export const PlayerDetailsPage = () => {
  const [achievements, setAchievements] = useState<any>([])
  const { id } = useParams()
  const [player, setPlayer] = useState<any>([])
  const { control, handleSubmit } = useForm()
  const [labelDate, setLabelDate] = useState<string>('')

  useEffect(() => {
    const fetchAchievements = async () => {
      setAchievements(await getAchievements());
    }

    fetchAchievements();
  }, [])

  useEffect(() => {
    const fetchPlayerAchievements = async () => {
      setPlayer(await getPlayerById(id || ''))
    }

    fetchPlayerAchievements();
  }, [id])

  const onSubmit = (data: any) => {
    const achievement = achievements.find((achievement: any) => achievement.id === data.achievements)
    const newAchievement = { ...achievement, achievementDate: data.dates[0].startDate, createdAt: new Date() }
    updatePlayerAchievement(id, newAchievement)
    setPlayer((prev: any) => (
      {
        ...prev,
        achievements: [...player?.achievements, newAchievement]
      }))
  }

  const formValues = useWatch({ control })

  useEffect(() => {
    if (formValues.dates) {
      const { startDate, endDate } = formValues.dates[0]

      const start = formatDate(startDate)
      const end = formatDate(endDate)

      const label = start === end ? start : `${start} - ${end}`
      setLabelDate(label)
    }
  }, [formValues])

  return (
    <Box sx={{ p: "16px", m: "16px" }}>
      <Typography variant="h4" mb={5}>Detalhes do Jogador: <strong>{player.name}</strong></Typography>
      <Grid>

        <FormControl fullWidth>
          <div style={{
            width: '100%',
            gap: 10,
            display: 'flex',
            marginBottom: 10
          }}>

            <Controller
              name="achievements"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel id="type-label">Atividades:</InputLabel>
                  <Select
                    {...field}
                    defaultValue=""
                    sx={{ flexGrow: 2 }}
                    label="Atividades"
                    variant="outlined"
                  >
                    <MenuItem value="">Selecione a atividade</MenuItem>
                    {achievements.map((achievement: any) => (
                      <MenuItem key={achievement.id} value={achievement.id || ''}>
                        {achievement.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />

            <Box sx={{ flexGrow: 1 }}>
              <Dialog
                title={labelDate === '' ? 'Adicionar periodo' : labelDate}
              >
                <DateRangeComponent name="dates" control={control} />
              </Dialog>
            </Box>

            <Button
              variant="contained"
              sx={{ flexGrow: 1 }}
              onClick={handleSubmit(onSubmit)}
              color="primary">
              Adicionar
            </Button>

          </div>
        </FormControl>

        <Typography variant="h6">Lista de atividades concluidas ou em andamento de jogadoras:</Typography>
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: "20%", fontWeight: "bold" }}>Nome</TableCell>
                <TableCell sx={{ width: "45%", fontWeight: "bold", textAlign: 'center' }}>Atividade</TableCell>
                <TableCell sx={{ width: "5%", fontWeight: "bold", textAlign: 'center' }}>Pontuação</TableCell>
                <TableCell sx={{ width: "10%", fontWeight: "bold", textAlign: 'center' }}>Data do Evento</TableCell>

                <TableCell sx={{ width: "15%", fontWeight: "bold", textAlign: 'center' }}>Intervalo de validade da tarefa</TableCell>
                <TableCell sx={{ width: "10%", fontWeight: "bold", textAlign: 'center' }}>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {player?.achievements?.map((achievement: any) => (
                <TableRow key={achievement.id}>
                  <TableCell><strong>{achievement.name}</strong></TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{achievement.description}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{achievement.points}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{getDate(achievement?.achievementDate) || 'nao cadastrado'}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>
                    <Typography variant="body2">
                      {achievement?.dates && getDate(achievement?.dates[0]?.startDate)} - {' '}
                      {achievement?.dates && getDate(achievement?.dates[0]?.endDate)}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>
                    <div style={{ display: 'flex', gap: 10, width: '100%' }}>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => {
                          removePlayerAchievement(id, achievement)
                          setPlayer((prev: any) => (
                            {
                              ...prev,
                              achievements: player.achievements
                                .filter((a: any) => a.createdAt.toString() !== achievement.createdAt.toString())
                            }))
                        }}>
                        Excluir
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid >
    </Box >
  )
}