import { Timestamp, addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore"
import { db } from "../firebaseConfig"


export const createAchievement = async (achievement: any) => {
  try {
    await addDoc(collection(db, 'achievements'), {
      ...achievement,
      created: Timestamp.now(),
    })
  } catch (error) {
    console.error('Error creating achievement: ', error)
  }
}


export const getAchievements = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'achievements'))
    const achievements = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    return achievements
  } catch (error) {
    console.error('Error fetching achievements: ', error)
  }
  return []
}

export const deleteAchievement = async (id: string) => {
  try {
    const eventDoc = doc(db, 'achievements', id)
    await deleteDoc(eventDoc)
  } catch (err) {
    console.error(err)
  }
}

export const updateAchievement = (id: string, newAchievementData: any) => {
  try {
    const eventDoc = doc(db, 'achievements', id)
    updateDoc(eventDoc, newAchievementData)
  } catch (err) {
    console.error(err)
  }
}



