/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-array-index-key */
import { useEffect, useState } from 'react'
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

export const Events = () => {
  const [events, setEvents] = useState<any>([])

  useEffect(() => {
    getEvents(setEvents)
  }, [])

  return (
    <ul>
      {events.map((event: any, key: number) => (
        <Event key={key} item={event} />
      ))}
    </ul>
  )
}
