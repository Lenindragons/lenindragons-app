/* eslint-disable @typescript-eslint/no-shadow */
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore'
import { db } from '../firebaseConfig'

interface User {
  uid: string
  name: string
  email: string
  image: string
  type: string
}

const usersCollection = collection(db, 'users')

export const createUser = async (user: User): Promise<void> => {
  const userDoc = doc(usersCollection, user.uid)
  await setDoc(userDoc, user)
}

export const getUser = async (uid: string): Promise<User | undefined> => {
  const userDoc = doc(usersCollection, uid)
  const snapshot = await getDoc(userDoc)
  return snapshot.exists() ? (snapshot.data() as User) : undefined
}

export const updateUser = async (
  uid: string,
  user: Partial<User>
): Promise<void> => {
  const userDoc = doc(usersCollection, uid)
  await updateDoc(userDoc, user)
}

export const deleteUser = async (uid: string): Promise<void> => {
  const userDoc = doc(usersCollection, uid)
  await deleteDoc(userDoc)
}

export const queryUsers = async (
  field: string,
  value: any
): Promise<User[]> => {
  const q = query(usersCollection, where(field, '==', value))
  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map((doc) => doc.data() as User)
}

export const getUsers = async (): Promise<User[]> => {
  const q = query(usersCollection)
  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map((doc) => doc.data() as User)
}
