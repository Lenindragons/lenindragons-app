import { Box, Grid, Paper, Typography } from "@mui/material"
import { AchievementHistory } from "../achievement-history/AchievementHistory"

type AchievementsAreaProps = {
  profilePlayer: {
    id: string,
  },
  setHasAchievements: any
}

const AchievementsArea = ({ profilePlayer, setHasAchievements }: AchievementsAreaProps) => {
  return (
    <Box component={Paper} p={3} sx={{ textAlign: 'center' }}>
      <Grid container spacing={2} sx={{ mt: 3 }}>
        <Grid item xs={12}>
          <Typography variant='h5' sx={{ margin: '10px 0' }}>
            Últimas Atividades concluídas
          </Typography>
          <AchievementHistory
            playerId={profilePlayer?.id}
            setHasAchievements={setHasAchievements}
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default AchievementsArea