import {
  collection,
  addDoc,
  Timestamp,
  query,
  orderBy,
  limit,
  onSnapshot,
  doc,
  deleteDoc,
} from '@firebase/firestore'
import { Event } from '../../components/forms/event/types'
import { db } from '../firebaseConfig'
import saveImageGetURL from '../images'
import { getDate } from '../../helpers/format-date'

const getEventCollection = () => {
  return collection(db, 'events')
}

export const createEvent = async (data: Event): Promise<void> => {
  try {
    const content = {
      name: data.name,
      description: data.description,
      image: await saveImageGetURL(data.image),
      date: {
        start: data.dates[0].startDate,
        end: data.dates[0].endDate,
      },
    }
    await addDoc(getEventCollection(), {
      ...content,
      created: Timestamp.now(),
    })
  } catch (err) {
    console.error(err)
  }
}

export const getEvents = async (callback: any) => {
  try {
    const eventsRef = getEventCollection()
    const eventsQuery = query(eventsRef, orderBy('created'), limit(20))
    return onSnapshot(eventsQuery, (eventsSnapshot) => {
      callback(
        eventsSnapshot.docs.map((document) => {
          const data = document.data()
          return {
            id: document.id,
            startDate: getDate(data.date.start),
            endDate: getDate(data.date.end),
            ...data,
          }
        })
      )
    })
  } catch (err) {
    console.error(err)
    callback([])
    return null
  }
}

export const deleteEvents = async (id: string) => {
  try {
    const eventDoc = doc(db, 'events', id)
    await deleteDoc(eventDoc)
  } catch (err) {
    console.error(err)
  }
  return id
}

export const updateEvents = (id: string) => {
  return id
}

export const getEventById = (id: string, callback: any) => {
  try {
    const eventRef = collection(db, 'events')
    const eventQuery = query(eventRef, orderBy('created'), limit(20))
    return onSnapshot(eventQuery, (eventSnapshot) => {
      const event = eventSnapshot.docs
        .filter((document) => document.id === id)
        .map((document) => {
          const data = document.data()
          return { id: document.id, ...data }
        })
      callback(event.pop())
    })
  } catch (err) {
    console.error(err)
    return null
  }
}
