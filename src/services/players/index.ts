import { collection, getDocs } from 'firebase/firestore'
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
