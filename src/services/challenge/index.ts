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
import { useParams } from 'react-router-dom'
import { where } from 'firebase/firestore'
import { Challenge } from '../../types/Challenge'
import { db } from '../firebaseConfig'

const getChallengeCollection = () => {
  return collection(db, 'challenges')
}

export const createChallenge = async (data: Challenge): Promise<void> => {
  try {
    const content = {
      rounds: data.rounds,
      roundTime: data.roundTime,
      seasonId: data.event.id,
      season: data.event,
      dates: data.dates,
    }
    await addDoc(getChallengeCollection(), {
      ...content,
      created: Timestamp.now(),
    })
  } catch (err) {
    console.error(err)
  }
}

export const getChallenges = async (callback: any, id: string) => {
  try {
    const challengesRef = getChallengeCollection()
    const challengesQuery = query(
      challengesRef,
      where('seasonId', '==', id),
      orderBy('created'),
      limit(20)
    )
    return onSnapshot(challengesQuery, (challengesSnapshot) => {
      callback(
        challengesSnapshot.docs.map((document) => {
          console.log('pokemon', document.data())
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

export const deleteChallenge = async (id: string) => {
  try {
    const eventDoc = doc(db, 'challenges', id)
    await deleteDoc(eventDoc)
  } catch (err) {
    console.error(err)
  }
}

export const updateChallenge = (id: string, newChallengeData: Challenge) => {
  try {
    const eventDoc = doc(db, 'challenges', id)
    updateDoc(eventDoc, newChallengeData)
  } catch (err) {
    console.error(err)
  }
}

export const getChallengeById = (id: string, callback: any) => {
  try {
    const eventRef = collection(db, 'challenges')
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
