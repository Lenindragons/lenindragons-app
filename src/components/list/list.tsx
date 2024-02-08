import { styled } from 'styled-components'
import { Timestamp } from 'firebase/firestore'
import { Link } from 'react-router-dom'
import { useEvents } from '../../context/EventContext'

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
  grid-template-columns: 1fr 1fr 1fr 1fr;
  flex-direction: row;
  align-items: center;
  flex: 1;
  justify-content: space-between;

  p:last-child,
  div:last-child {
    flex: 1;
    text-align: center;
  }

  div:last-child {
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
    <ul>
      <EventItemHeader>
        <EventData>
          <p>Nome</p>
          <p>Data de Inicio</p>
          <p>Status</p>
          <p>Ações</p>
        </EventData>
      </EventItemHeader>
      {events.map((event: any) => (
        <EventItem key={event.id}>
          <EventData>
            <Link to={`/event/${event.id}`}>
              <strong>{event.name}</strong>
            </Link>
            <p>{event.startDate}</p>
            <p>{getStatus(event.created)}</p>
            <div>
              <EditButton onClick={() => handleEdit(event.id)}>
                Editar
              </EditButton>
              <DeleteButton onClick={() => handleDelete(event.id)}>
                Excluir
              </DeleteButton>
            </div>
          </EventData>
        </EventItem>
      ))}
    </ul>
  )
}

export default EventList
