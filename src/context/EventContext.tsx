import { createContext, useContext, useEffect, useState } from 'react'
import { ContextProps } from './ContextProps'
import { getEvents } from '../services/events'
import { Event } from '../components/forms/event/types'

const EventContext = createContext({})

export const EventProvider = ({ children }: ContextProps) => {
  const [events, setEvents] = useState<Event[]>([])

  useEffect(() => {
    getEvents(setEvents)
  }, [])

  return (
    <EventContext.Provider value={{ events }}>{children}</EventContext.Provider>
  )
}

export const useEvents = (): any => {
  return useContext(EventContext)
}
