/* eslint-disable @typescript-eslint/no-shadow */
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
import { getDoc, where } from 'firebase/firestore'
import { Challenge, ChallengeResult } from '../../types/Challenge'
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

export const updateChallenge = (
  id: string,
  newChallengeData: ChallengeResult
) => {
  try {
    const eventDoc = doc(db, 'challenges', id)
    updateDoc(eventDoc, newChallengeData)
  } catch (err) {
    console.error(err)
  }
}

export const getChallengeById = async (id: string) => {
  try {
    const eventRef = doc(db, 'challenges', id)
    const docSnap = await getDoc(eventRef)
    if (docSnap.exists()) {
      const data = docSnap.data()
      return data
    }
    return {}
  } catch (err) {
    console.error(err)
    return null
  }
}

export const getChallengeBySeasonId = async (id: string, callback: any) => {
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
