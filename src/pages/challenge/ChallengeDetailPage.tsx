import { useEffect, useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  List,
  Button,
} from '@mui/material'
import { useParams } from 'react-router-dom'
import { usePage } from '../../context/PageContext'
import { getChallengeById } from '../../services/challenge'
import DynamicForm from '../../components/dynamic-form'
import { PlayerList } from './components/players-list/PlayerList'
import {
  PlayerItemsProvider,
  usePlayerItem,
} from './hooks/player-list/usePlayersList'

const ChallengeDetailPage = () => {
  const { setTitle } = usePage()
  const { id = '' } = useParams()
  const { hasFinished } = usePlayerItem()
  const [tournament, setChallenge] = useState({
    id: '',
    rounds: '',
    date: [{ startDate: '', endDate: '', key: '' }],
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
    console.log({ tournament })
  }, [tournament])

  useEffect(() => {
    setTitle('Torneio')
  }, [setTitle])

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Torneio em {tournament.season.name}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Data do Torneio:
        {/* {tournament.date[0].startDate !== '' &&
            getDate(tournament.date[0].startDate)} */}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Resumo das rodadas
              </Typography>
              <List />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Resumo do resultado
          </Typography>
          <PlayerList />
          {hasFinished && (
            <Button variant="contained" style={{ marginTop: 15 }}>
              <Typography variant="button">Salvar resultado</Typography>
            </Button>
          )}
        </Grid>
        <Grid item xs={12} md={12}>
          <DynamicForm />
        </Grid>
      </Grid>
    </Box>
  )
}

export default ChallengeDetailPage
