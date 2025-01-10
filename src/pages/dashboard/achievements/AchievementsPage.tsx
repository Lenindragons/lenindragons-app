import BasicModal from "@/components/commons/modal/ModalMUI"
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import CreateAchievementsForm from "./forms/CreateAchievementsForm"
import { createAchievement, deleteAchievement, getAchievements, updateAchievement } from "@/services/achievements"
import { getDate } from "@/helpers/format-date"

export const AchievementsPage = () => {
  const [achievements, setAchievements] = useState<any>([])

  useEffect(() => {
    const fetchAchievements = async () => {
      setAchievements(await getAchievements());
    }

    fetchAchievements();
  }, []);

  const createItem = (newAchievementsData: any) => {
    setAchievements([...achievements, newAchievementsData])
    createAchievement(newAchievementsData)
  }

  const deleteItem = (id: string) => () => {
    const newAchievements = achievements.filter((achievement: any) => achievement.id !== id)
    setAchievements(newAchievements)
    deleteAchievement(id)
  }

  const editItem = (id: string) => (newAchievementsData: any) => {
    updateAchievement(id, newAchievementsData)
  }

  const achievementsTypes = {
    'add': 'Adição de pontos',
    'remove': 'Remoção de pontos',
    'multiply': 'Multiplicação de pontos',
    'divide': 'Divisão de pontos'
  }

  const getLabel = (type = null) => {
    if (!type) return ''
    return achievementsTypes[type]
  }

  return <Box sx={{ p: "16px", m: "16px" }}>

    <BasicModal label="Criar Atividade">
      <CreateAchievementsForm callback={createItem} />
    </BasicModal>

    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: "30%", fontWeight: "bold" }}>Nome</TableCell>

            <TableCell sx={{ width: "40%", fontWeight: "bold", textAlign: 'center' }}>Atividade</TableCell>
            <TableCell sx={{ width: "15%", fontWeight: "bold", textAlign: 'center' }}>Tipo</TableCell>
            <TableCell sx={{ width: "5%", fontWeight: "bold", textAlign: 'center' }}>Pontuação</TableCell>
            <TableCell sx={{ width: "5%", fontWeight: "bold", textAlign: 'center' }}>Data de Inicio</TableCell>
            <TableCell sx={{ width: "5%", fontWeight: "bold", textAlign: 'center' }}>Data de Fim</TableCell>
            <TableCell sx={{ width: "10%", fontWeight: "bold", textAlign: 'center' }}>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {achievements.map((achievement: any) => (
            <TableRow key={achievement.id}>
              <TableCell><strong>{achievement.name}</strong></TableCell>
              <TableCell sx={{ textAlign: 'center' }}>{achievement.description}</TableCell>
              <TableCell sx={{ textAlign: 'center' }}>{getLabel(achievement.type)}</TableCell>
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
                  <BasicModal label="Editar">
                    <CreateAchievementsForm values={achievement} callback={editItem(achievement.id)} />
                  </BasicModal>
                  <Button variant="contained" color="error" onClick={deleteItem(achievement.id)}>Excluir</Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Box>
}
