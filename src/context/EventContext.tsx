import { createContext, useContext, useEffect, useState } from 'react'
import { GridSelectionModel } from '@material-ui/data-grid'
import { ContextProps } from './ContextProps'
import { getEvents, deleteEvent, updateEvent } from '../services/events'
import { Event } from '../types/Event'

const EventContext = createContext({})

export const EventProvider = ({ children }: ContextProps) => {
  const [events, setEvents] = useState<Event[]>([])
  const [items, setItems] = useState<GridSelectionModel>([])

  const onSelectionModelChange = (ids: GridSelectionModel) => {
    setItems(ids)
  }

  const removeEvent = async (id: string) => {
    deleteEvent(id)
    setItems(items.filter((item) => item !== id))
  }

  const editEvent = (id: string, newEventData: Event) => {
    updateEvent(id, newEventData)
  }

  useEffect(() => {
    getEvents(setEvents, 'season')
  }, [])

  return (
    <EventContext.Provider
      value={{
        events,
        items,
        onSelectionModelChange,
        removeEvent,
        editEvent,
      }}
    >
      {children}
    </EventContext.Provider>
  )
}

export const useEvents = (): any => {
  return useContext(EventContext)
}
