import { Card, CardContent, Typography, Grid } from "@mui/material"

type ScoreBoardProps = {
  wins: number
  draws: number
  losses: number
}

const ScoreBoard = ({ wins, draws, losses }: ScoreBoardProps) => {
  return (
    <Grid container spacing={2} style={{ padding: "10px" }}>
      <Grid item xs={3}>
        <Card elevation={5}>
          <CardContent>
            <Typography variant="h6" component="div">
              Total
            </Typography>
            <Typography variant="h5">{wins + draws + losses}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={3}>
        <Card elevation={5}>
          <CardContent>
            <Typography variant="h6" component="div">
              🏆 Vitórias
            </Typography>
            <Typography variant="h5">{wins}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={3}>
        <Card elevation={5}>
          <CardContent>
            <Typography variant="h6" component="div">
              🤝 Empates
            </Typography>
            <Typography variant="h5">{draws}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={3}>
        <Card elevation={5}>
          <CardContent>
            <Typography variant="h6" component="div">
              ❌ Derrotas
            </Typography>
            <Typography variant="h5">{losses}</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default ScoreBoard
