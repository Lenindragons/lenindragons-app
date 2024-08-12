/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  Avatar,
  Paper,
  Chip,
} from '@mui/material'
import { getEventById } from '../../services/events'
import { getDate } from '../../helpers/format-date'
import { Modal } from '../../components/commons/modal/Modal'
import { ChallengeForm } from './forms/event/ChallengeForm'
import { createChallenge } from '../../services/challenge'
import { ChallengeList } from './components/challenge-list/ChallengeList'

const EventDetailPage = () => {
  const { id = '' } = useParams()
  const [event, setEvent] = useState({
    name: '',
    description: '',
    dates: [{ startDate: null, endDate: null }],
    image: {
      name: '',
      url: '',
    },
  })

  useEffect(() => {
    getEventById(id, setEvent)
  }, [id])

  return (
    <Box sx={{ padding: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={3}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Avatar
              alt={event?.image.name}
              src={event?.image.url}
              sx={{
                width: 140,
                height: 140,
                margin: 'auto',
                backgroundColor: '#f0f0f0',
              }}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={9}>
          <Card>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                {event?.name}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {event?.description}
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, marginTop: 2 }}>
                <Chip
                  label={`Início: ${event.dates[0]?.startDate && getDate(event?.dates[0]?.startDate)}`}
                  color="primary"
                  variant="outlined"
                />
                <Chip
                  label={`Final: ${event.dates[0]?.endDate && getDate(event?.dates[0]?.endDate)}`}
                  color="secondary"
                  variant="outlined"
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
            <Typography variant="h5" gutterBottom>
              Torneios da Temporada
            </Typography>
            <Modal label="Adicionar torneio">
              <ChallengeForm callback={createChallenge} data={{ event }} />
            </Modal>
          </Paper>
          <ChallengeList seasonId={id} />
        </Grid>
      </Grid>
    </Box>
  )
}

export default EventDetailPage
