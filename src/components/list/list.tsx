/* eslint-disable no-alert */
import { Timestamp } from 'firebase/firestore'
import { Link } from 'react-router-dom'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Typography,
  Box,
  Button,
  Chip,
} from '@mui/material'
import { useEvents } from '@/context/EventContext'
import { Modal } from '../commons/modal/Modal'
import { EventForm } from '@/pages/dashboard/seasons/forms/event/EventForm'
import { getDate } from '@/helpers/format-date'
import glcIcon from '@/assets/glc-logo-min.png'
import lcIcon from '@/assets/league-challenge-min.png'
import plIcon from '@/assets/pokemon-league-min.png'
import limitless from '@/assets/limitless.png'
import { useAuth } from '@/context/AuthContext'

export const EventList = () => {
  const { user } = useAuth()
  const { events, removeEvent, editEvent } = useEvents()

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      'Você tem certeza que quer deletar esse temporada?'
    )
    if (confirmed) {
      removeEvent(id)
    }
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'GLC':
        return glcIcon
      case 'league_challenge':
        return lcIcon
      case 'season':
        return plIcon
      case 'season-online':
        return limitless
      default:
        return ''
    }
  }

  const getStatus = (startDate: Timestamp, endDate: Timestamp) => {
    const now = new Date()
    const eventEndDate = endDate.toDate()
    const eventStartDate = startDate.toDate()
    if (eventEndDate < now) {
      return 'Encerrado'
    }

    if (eventStartDate > now) {
      return 'Agendado'
    }

    return 'Em andamento'
  }

  const color: { [key: string]: 'error' | 'warning' | 'success' } = {
    Encerrado: 'error',
    Agendado: 'warning',
    'Em andamento': 'success',
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Imagem</TableCell>
            <TableCell>Nome</TableCell>
            <TableCell style={{ textAlign: 'center' }}>Tipo</TableCell>
            <TableCell style={{ textAlign: 'center' }}>
              Data de Início
            </TableCell>
            <TableCell style={{ textAlign: 'center' }}>Data de Fim</TableCell>
            <TableCell style={{ textAlign: 'center' }}>Status</TableCell>
            <TableCell style={{ textAlign: 'center' }}>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {events.map((event: any) => (
            <TableRow key={event.id}>
              <TableCell>
                <Avatar
                  alt={event.image.name}
                  src={event.image.url}
                  sx={{ width: 56, height: 56, backgroundColor: '#f0f0f0' }}
                />
              </TableCell>
              <TableCell>
                <Link
                  to={`/seasons/${event.id}`}
                  style={{ textDecoration: 'none' }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      color: (theme) => theme.palette.text.primary,
                      textDecoration: 'underline',
                      textUnderlineOffset: '4px',
                    }}
                  >
                    {event.name}
                  </Typography>
                </Link>
              </TableCell>
              <TableCell style={{ textAlign: 'center' }}>
                <img
                  alt={event.type}
                  src={getIcon(event.type)}
                  style={{ width: event.type === 'GLC' ? 64 : 54 }}
                />
              </TableCell>
              <TableCell style={{ textAlign: 'center' }}>
                <Typography variant="body2">
                  {getDate(event.dates[0].startDate)}
                </Typography>
              </TableCell>
              <TableCell style={{ textAlign: 'center' }}>
                <Typography variant="body2">
                  {getDate(event.dates[0].endDate)}
                </Typography>
              </TableCell>
              <TableCell style={{ textAlign: 'center' }}>
                <Chip
                  label={getStatus(
                    event.dates[0].startDate,
                    event.dates[0].endDate
                  )}
                  variant="outlined"
                  color={
                    color[
                      getStatus(
                        event.dates[0].startDate,
                        event.dates[0].endDate
                      )
                    ]
                  }
                />
              </TableCell>
              <TableCell>
                <Box
                  sx={{
                    display: 'flex',
                    width: '100%',
                    gap: 2,
                    justifyContent: 'center',
                  }}
                >
                  {['admin', 'judge'].includes(user.type) && (
                    <Modal label="Editar Evento">
                      <EventForm
                        callback={(data) => editEvent(event.id, data)}
                        data={event}
                      />
                    </Modal>
                  )}
                  <Button
                    variant="contained"
                    color="error"
                    disabled={!['admin', 'judge'].includes(user.type)}
                    onClick={() => handleDelete(event.id)}
                  >
                    Excluir
                  </Button>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default EventList
