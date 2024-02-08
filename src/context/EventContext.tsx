import { createContext, useContext, useEffect, useState } from 'react'
import { GridSelectionModel } from '@material-ui/data-grid'
import { ContextProps } from './ContextProps'
import { getEvents } from '../services/events'
import { Event } from '../components/forms/event/types'

const EventContext = createContext({})

export const EventProvider = ({ children }: ContextProps) => {
  const [events, setEvents] = useState<Event[]>([])
  const [items, setItems] = useState<GridSelectionModel>([])

  const onSelectionModelChange = (ids: GridSelectionModel) => {
    setItems(ids)
  }

  const removeEvent = async (id: string) => {
    setItems(items.filter((item) => item !== id))
  }

  useEffect(() => {
    getEvents(setEvents)
  }, [])

  return (
    <EventContext.Provider
      value={{ events, items, onSelectionModelChange, removeEvent }}
    >
      {children}
    </EventContext.Provider>
  )
}

export const useEvents = (): any => {
  return useContext(EventContext)
}
