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
import firebase from 'firebase/compat/app'
import { getDoc, getDocs, getFirestore, where } from 'firebase/firestore'
import { Sprite } from '../../types/Sprite'
import { db } from '../firebaseConfig'

const getSpriteCollection = () => {
  return collection(db, 'sprites')
}

export const createSprite = async (data: Sprite): Promise<void> => {
  try {
    const content = {
      ...data,
    }
    await addDoc(getSpriteCollection(), {
      ...content,
      created: Timestamp.now(),
    })
  } catch (err) {
    console.error(err)
  }
}

export const getSprites = async (callback: any) => {
  try {
    const spritesRef = getSpriteCollection()
    const spritesQuery = query(spritesRef, orderBy('created'), limit(20))
    return onSnapshot(spritesQuery, (spritesSnapshot) => {
      callback(
        spritesSnapshot.docs.map((document) => {
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

export const deleteSprite = async (id: string) => {
  try {
    const spriteDoc = doc(db, 'sprite', id)
    await deleteDoc(spriteDoc)
  } catch (err) {
    console.error(err)
  }
}

export const updateSprite = (id: string, newSpriteData: Sprite) => {
  try {
    const spriteDoc = doc(db, 'sprite', id)
    updateDoc(spriteDoc, newSpriteData)
  } catch (err) {
    console.error(err)
  }
}

export const getSpriteByName = async (name: string) => {
  try {
    const database = getFirestore()
    const spriteRef = collection(database, 'sprites')
    const spriteQuery = query(spriteRef, where('name', '==', name))
    const querySnapshot = await getDocs(spriteQuery)

    if (!querySnapshot.empty) {
      const spriteData = querySnapshot.docs[0].data()
      return spriteData
    }
    console.log('No such document!')
    return null
  } catch (err) {
    console.error(err)
    return null
  }
}

export const getSpriteById = (id: string, callback: any) => {
  try {
    const spriteRef = collection(db, 'sprite')
    const spriteQuery = query(spriteRef, orderBy('created'), limit(20))
    return onSnapshot(spriteQuery, (spriteSnapshot) => {
      const Sprite = spriteSnapshot.docs
        .filter((document) => document.id === id)
        .map((document) => {
          const data = document.data()
          return { id: document.id, ...data }
        })
      callback(Sprite.pop())
    })
  } catch (err) {
    console.error(err)
    return null
  }
}
