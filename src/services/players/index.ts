/* eslint-disable @typescript-eslint/no-shadow */
import { arrayRemove, arrayUnion, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore'
import { db } from '../firebaseConfig'

export const getPlayers = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'players'))
    const playersList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    return playersList
  } catch (error) {
    console.error('Error fetching players: ', error)
  }
  return []
}

export const getPlayerById = async (id: string) => {
  try {
    const eventRef = doc(db, 'players', id)
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

export const deletePlayer = async (id: string) => {
  try {
    const eventDoc = doc(db, 'players', id)
    await deleteDoc(eventDoc)
  } catch (err) {
    console.error(err)
  }
}

export const updatePlayerAchievement = async (id: any, data: any) => {
  try {
    const eventDoc = doc(db, 'players', id)
    updateDoc(eventDoc, { achievements: arrayUnion(data) })
  } catch (err) {
    console.error(err)
  }
}

export const createAchievementUniqueId = () => doc(db, 'players').id

export const removePlayerAchievement = async (id: any, data: any) => {
  try {
    const eventDoc = doc(db, 'players', id)
    updateDoc(eventDoc, { achievements: arrayRemove(data) })
  } catch (err) {
    console.error(err)
  }
}

export const updatePlayer = async (id: string, data: any) => {
  try {
    const eventDoc = doc(db, 'players', id)
    updateDoc(eventDoc, data)
  } catch (err) {
    console.error(err)
  }
}