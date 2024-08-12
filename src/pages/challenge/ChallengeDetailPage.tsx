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
import { getChallengeById, updateChallenge } from '../../services/challenge'
import DynamicForm from '../../components/dynamic-form'
import { PlayerList } from './components/players-list/PlayerList'
import { usePlayerItem } from './hooks/player-list/usePlayersList'
import { getDate } from '../../helpers/format-date'

const initialTournament = {
  id: '',
  rounds: '',
  dates: [{ startDate: '', endDate: '', key: '' }],
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
}

const ChallengeDetailPage = () => {
  const { setTitle } = usePage()
  const { id = '' } = useParams()
  const { hasFinished, playerItems } = usePlayerItem(id)
  const [tournament, setChallenge] = useState(initialTournament)

  useEffect(() => {
    const fetchChallenge = async () => {
      return getChallengeById(id)
    }
    const fetchChallengeData = async () => {
      const challengeData = (await fetchChallenge()) || initialTournament
      setChallenge(challengeData)
    }

    fetchChallengeData()
  }, [id])

  useEffect(() => {
    setTitle('Torneio')
  }, [setTitle])

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Torneio em {tournament.season.name}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Resumo das rodadas
          </Typography>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <strong>Data do Torneio:</strong>{' '}
                {tournament?.dates[0].startDate &&
                  getDate(tournament?.dates[0].startDate)}
              </Typography>
              <p>
                <strong>Tempo de Rodada:</strong>{' '}
                {tournament?.roundTime && `${tournament?.roundTime} minutos`}
              </p>
              <p>
                <strong>Quantidade de Rodadas:</strong>{' '}
                {tournament?.rounds && `${tournament?.rounds} rodadas`}
              </p>
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
            <Button
              variant="contained"
              style={{ marginTop: 15 }}
              onClick={() => {
                updateChallenge(id, { challenge: { result: playerItems } })
              }}
            >
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
