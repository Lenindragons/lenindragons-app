import { styled } from 'styled-components'
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
} from '@mui/material'
import { useEvents } from '../../context/EventContext'
import { Modal } from '../commons/modal/Modal'
import { EventForm } from '../../pages/events/forms/event/EventForm'
import { getDate } from '../../helpers/format-date'

const EventItem = styled.li`
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-color: greenl;
`

const EventItemHeader = styled(EventItem)`
  background-color: #f2f2f2;
`

const EventData = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 1fr 1fr 1fr 1fr 1fr;
  flex-direction: row;
  align-items: center;
  flex: 1;
  justify-content: space-between;

  p:last-child,
  > div:last-child {
    flex: 1;
    text-align: center;
  }

  > div:last-child {
    display: flex;
    justify-content: space-around;
  }
`

const EditButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 3px;
`

const DeleteButton = styled.button`
  background-color: #f44336;
  color: white;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 3px;
`

export const EventList = () => {
  const { events, removeEvent, editEvent } = useEvents()

  const handleEdit = (id: string, newEventData: Event) => {
    editEvent(id, newEventData)
  }

  const handleDelete = async (id: string) => {
    removeEvent(id)
  }

  const getStatus = (date: Timestamp) => {
    const now = new Date()
    const eventDate = date.toDate()
    if (eventDate < now) {
      return 'Encerrado'
    }
    return 'Em andamento'
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Imagem</TableCell>
            <TableCell>Nome</TableCell>
            <TableCell>Data de Início</TableCell>
            <TableCell>Data de Fim</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Ações</TableCell>
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
                <Link to={`/seasons/${event.id}`}>
                  <Typography variant="body1">{event.name}</Typography>
                </Link>
              </TableCell>
              <TableCell>
                <Typography variant="body2">
                  {getDate(event.dates[0].startDate)}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2">
                  {getDate(event.dates[0].endDate)}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2">
                  {getStatus(event.created)}
                </Typography>
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Modal label="Editar Evento">
                    <EventForm
                      callback={(data) => editEvent(event.id, data)}
                      data={event}
                    />
                  </Modal>

                  <Button
                    variant="contained"
                    color="error"
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
