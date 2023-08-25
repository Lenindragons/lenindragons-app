import {
  collection,
  addDoc,
  Timestamp,
  query,
  orderBy,
  limit,
  onSnapshot,
} from '@firebase/firestore'
import { Event } from '../../components/forms/event/types'
import { db } from '../firebaseConfig'
import saveImageGetURL from '../images'

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

export const getEvents = (callback: any) => {
  try {
    const eventsRef = collection(db, 'events')
    const eventsQuery = query(eventsRef, orderBy('created'), limit(20))
    return onSnapshot(eventsQuery, (eventsSnapshot) => {
      callback(
        eventsSnapshot.docs.map((doc) => {
          const data = doc.data()
          return { id: doc.id, ...data }
        })
      )
    })
  } catch (err) {
    console.error(err)
    return null
  }
}

export const deleteEvents = (id: string) => {
  return id
}

export const updateEvents = (id: string) => {
  return id
}

export const getEventById = (id: string) => {
  return id
}
