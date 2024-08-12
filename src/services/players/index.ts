/* eslint-disable @typescript-eslint/no-shadow */
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore'
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

export const deletePlayer = async (id: string) => {
  try {
    const eventDoc = doc(db, 'players', id)
    await deleteDoc(eventDoc)
  } catch (err) {
    console.error(err)
  }
}
