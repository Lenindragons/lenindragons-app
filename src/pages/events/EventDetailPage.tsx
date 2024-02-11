import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getEventById } from '../../services/events'
import { getDate } from '../../helpers/format-date'

const EventDetailPage = () => {
  const { id = '' } = useParams()
  const [event, setEvent] = useState({
    name: '',
    description: '',
    dates: [{ startDate: null, endDate: null }],
    image: '',
  })

  useEffect(() => {
    getEventById(id, setEvent)
  }, [id])

  return (
    <div>
      <h1>Event Detail Page</h1>
      <figure>
        <img src={event?.image} alt={event?.name} width={350} />
      </figure>
      <p>Event ID: {id}</p>
      <p>Event Name: {event?.name}</p>
      <p>Event Description: {event?.description}</p>
      <p>
        Event Date Start:
        {event.dates[0]?.startDate && getDate(event?.dates[0]?.startDate)}
      </p>
      <p>
        Event Date End:
        {event.dates[0]?.endDate && getDate(event?.dates[0]?.endDate)}
      </p>
    </div>
  )
}

export default EventDetailPage
