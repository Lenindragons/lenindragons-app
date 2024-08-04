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
  updateDoc,
} from '@firebase/firestore'
import { Event } from '../../types/Event'
import { db } from '../firebaseConfig'
import saveImageGetURL from '../images'
import { getSpriteByName, getSprites } from '../sprites'

const getEventCollection = () => {
  return collection(db, 'events')
}

export const createEvent = async (data: Event): Promise<void> => {
  console.log({ data })
  const sprite = await getSpriteByName(data.icon.name)
  try {
    const content = {
      name: data.name,
      description: data.description,
      image: {
        name: data.icon.name,
        url: sprite?.image,
      },
      dates: data.dates,
    }
    await addDoc(getEventCollection(), {
      ...content,
      created: Timestamp.now(),
    })
    console.log(content)
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

export const deleteEvent = async (id: string) => {
  try {
    const eventDoc = doc(db, 'events', id)
    await deleteDoc(eventDoc)
  } catch (err) {
    console.error(err)
  }
}

export const updateEvent = (id: string, newEventData: Event) => {
  try {
    const eventDoc = doc(db, 'events', id)
    updateDoc(eventDoc, newEventData)
  } catch (err) {
    console.error(err)
  }
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
