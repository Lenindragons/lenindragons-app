import { Loading } from "@/components/commons/loading/Loading"
import { getDate } from "@/helpers/format-date"
import { getAchievements } from "@/services/achievements"
import { WebPageTemplate } from "@/templates/webpage/WebPage"
import { CatchingPokemon } from "@mui/icons-material"
import { Alert, AlertTitle, Box, Chip, Paper, Typography } from "@mui/material"
import { useEffect, useState } from "react"

export const AchievementsDetailPage = () => {
  const [achievements, setAchievements] = useState<any>([])

  useEffect(() => {
    const fetchAchievements = async () => {
      const achievements = await getAchievements()
      setAchievements(achievements)
    }

    if (achievements.length === 0) {
      fetchAchievements()
    }
  }, [])

  if (achievements.length === 0) {
    return (<WebPageTemplate><Loading /></WebPageTemplate>)
  }

  return (
    <WebPageTemplate>
      <Typography variant="h4" m={3} ><strong>Atividades de liga</strong> disponiveis</Typography>

      <Alert severity="warning" style={{ width: "100%", marginBottom: "15px", border: "1px solid orange" }}>
        <AlertTitle><strong>Atenção</strong></AlertTitle>
        Procure uma organizadora para creditar seus pontos de atividade. É necessário um comprovante de participação.
        <p><strong>(foto com data e nome na lista do torneio)</strong></p>
      </Alert>

      <Box component={Paper} p={2}>
        {achievements.map((achievement: any) => (
          <Alert
            icon={<CatchingPokemon color="error" />}
            severity="info"
            key={achievement.id}
            variant="outlined"
            sx={{ width: '100%', mb: 2 }}
          >
            <strong>{achievement.name}</strong>
            <p style={{ marginBottom: '20px' }}>{achievement.description}</p>

            <Chip
              label={`Inicio: ${getDate(achievement?.dates[0]?.startDate)} - Fim: ${getDate(achievement?.dates[0]?.endDate)}`}
              variant="outlined" />

          </Alert>
        ))}
      </Box>
    </WebPageTemplate>
  )
}