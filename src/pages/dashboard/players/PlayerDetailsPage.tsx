import { getDate } from "@/helpers/format-date"
import { getAchievements } from "@/services/achievements"
import { getPlayerById, removePlayerAchievement, updatePlayerAchievement } from "@/services/players"
import { Box, Button, FormControl, Grid, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { useParams } from "react-router-dom"

export const PlayerDetailsPage = () => {
  const [achievements, setAchievements] = useState<any>([])
  const { id } = useParams()
  const [player, setPlayer] = useState<any>([])
  const { control, handleSubmit } = useForm()

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
    const newAchievement = { ...achievement, createdAt: new Date() }
    updatePlayerAchievement(id, newAchievement)
    setPlayer((prev: any) => (
      {
        ...prev,
        achievements: [...player.achievements, newAchievement]
      }))
  }

  return (
    <Box sx={{ p: "16px", m: "16px" }}>
      <Typography variant="h4">Player Details</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>

          <FormControl fullWidth>
            <Controller
              name="achievements"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  fullWidth
                  defaultValue=""
                  label="Atividades"
                  variant="outlined"
                >
                  <MenuItem value="">Selecione</MenuItem>
                  {achievements.map((achievement: any) => (
                    <MenuItem key={achievement.id} value={achievement.id || ''}>
                      {achievement.name}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            <Button
              variant="contained"
              onClick={handleSubmit(onSubmit)}
              color="primary">
              Adicionar
            </Button>
          </FormControl>

          <Typography variant="h6">Lista de atividades concluidas ou em andamento de jogadores:</Typography>
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ width: "30%", fontWeight: "bold" }}>Nome</TableCell>
                  <TableCell sx={{ width: "40%", fontWeight: "bold", textAlign: 'center' }}>Atividade</TableCell>
                  <TableCell sx={{ width: "5%", fontWeight: "bold", textAlign: 'center' }}>Pontuação</TableCell>
                  <TableCell sx={{ width: "5%", fontWeight: "bold", textAlign: 'center' }}>Data de Inicio</TableCell>
                  <TableCell sx={{ width: "5%", fontWeight: "bold", textAlign: 'center' }}>Data de Fim</TableCell>
                  <TableCell sx={{ width: "10%", fontWeight: "bold", textAlign: 'center' }}>Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {player?.achievements?.map((achievement: any) => (
                  <TableRow key={achievement.id}>
                    <TableCell><strong>{achievement.name}</strong></TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{achievement.description}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{achievement.points}</TableCell>
                    <TableCell style={{ textAlign: 'center' }}>
                      <Typography variant="body2">
                        {achievement?.dates && getDate(achievement?.dates[0]?.startDate)}
                      </Typography>
                    </TableCell>
                    <TableCell style={{ textAlign: 'center' }}>
                      <Typography variant="body2">
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
        </Grid>
      </Grid>
    </Box>
  )
}