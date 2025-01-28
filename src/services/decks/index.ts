import { doc, getDoc } from "firebase/firestore"
import { db } from "../firebaseConfig"
import { Deck } from "./useDeckStore"

export const getDeckById = async (id: string) => {
  const docRef = doc(db, 'decks', id)
  const docSnapshot = await getDoc(docRef)
  const deck = { id: docSnapshot.id, ...docSnapshot.data() } as Deck
  return deck
}

