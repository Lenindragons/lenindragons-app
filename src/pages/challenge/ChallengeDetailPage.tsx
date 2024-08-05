import { useEffect, useState } from 'react'
import { Box, Card, CardContent, Grid, Typography, List } from '@mui/material'
import { useParams } from 'react-router-dom'
import { usePage } from '../../context/PageContext'
import { getChallengeById } from '../../services/challenge'
import DynamicForm from '../../components/dynamic-form'

const ChallengeDetailPage = () => {
  const { setTitle } = usePage()
  const { id = '' } = useParams()
  const [tournament, setChallenge] = useState({
    id: '',
    rounds: '',
    date: '[{ startDate: null, endDate: null }]',
    seasonId: '',
    season: {
      id: '',
      name: '',
      icon: '',
      description: '',
      dates: [
        {
          endDate: '',
          startDate: '',
          key: '',
        },
      ],
    },
  })

  useEffect(() => {
    getChallengeById(id, setChallenge)
  }, [id])

  useEffect(() => {
    setTitle('Torneio')
  }, [setTitle])

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        {tournament.name}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Data do Torneio: {tournament.date}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Rodadas
              </Typography>
              <List />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Participantes
              </Typography>
              <List />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={12}>
          <DynamicForm />
        </Grid>
      </Grid>
    </Box>
  )
}

export default ChallengeDetailPage
