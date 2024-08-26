import { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import { getEvents } from '../../services/events'
import { getDate } from '../../helpers/format-date'

const Event = ({ item }: any) => {
  if (!item) {
    return null
  }

  return (
    <li>
      <img src={item.image} alt={item.name} />
      <p>
        <strong>id:</strong> {item.id}
      </p>
      <p>
        <strong>name:</strong> {item.name}
      </p>
      <p>
        <strong>description:</strong> {item.description}
      </p>
      <p>
        <strong>dates:</strong>
        {getDate(item.date.start)} - {getDate(item.date.end)}
      </p>
    </li>
  )
}

const EventContainer = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 16px;
  gap: 20px;

  li img {
    max-width: 100%;
    max-height: 450px;
  }
`

export const Events = () => {
  const [events, setEvents] = useState<any>([])

  useEffect(() => {
    getEvents(setEvents, 'season')
  }, [])

  return (
    <EventContainer>
      {events.map((event: any) => (
        <Event key={event.id} item={event} />
      ))}
    </EventContainer>
  )
}
