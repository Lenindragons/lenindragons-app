import { create } from 'zustand'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore'
import { db } from '../firebaseConfig'

export interface PokemonIcon {
  name: string
  url: string
}

export interface Deck {
  id: string
  name: string
  icons: PokemonIcon[]
  type: string
}

interface DeckStore {
  decks: Deck[]
  getDecks: () => Promise<void>
  getDecksByType: (type: string) => Promise<void>
  createDeck: (
    name: string,
    icons: PokemonIcon[],
    type: string
  ) => Promise<void>
  deleteDeck: (id: string) => Promise<void>
  updateDeck: (
    id: string,
    name: string,
    icons: PokemonIcon[],
    type: string
  ) => Promise<void>
}

const useDeckStore = create<DeckStore>((set) => ({
  decks: [],
  getDecks: async () => {
    const queryDecks = query(collection(db, 'decks'))
    const querySnapshot = await getDocs(queryDecks)
    const decks: Deck[] = []
    querySnapshot.forEach((documment) => {
      decks.push({ id: documment.id, ...documment.data() } as Deck)
    })
    set({ decks })
  },
  getDecksByType: async (type: string) => {
    const queryDecks = query(collection(db, 'decks'), where(type, '==', type))
    const querySnapshot = await getDocs(queryDecks)
    const decks: Deck[] = []
    querySnapshot.forEach((documment) => {
      decks.push({ id: documment.id, ...documment.data() } as Deck)
    })
    set({ decks })
  },
  createDeck: async (name: string, icons: PokemonIcon[], type: string) => {
    const docRef = await addDoc(collection(db, 'decks'), { name, icons })
    set((state) => ({
      decks: [...state.decks, { id: docRef.id, name, icons, type }],
    }))
  },
  deleteDeck: async (id: string) => {
    await deleteDoc(doc(db, 'decks', id))
    set((state) => ({
      decks: state.decks.filter((deck) => deck.id !== id),
    }))
  },
  updateDeck: async (
    id: string,
    name: string,
    icons: PokemonIcon[],
    type: string
  ) => {
    const deckRef = doc(db, 'decks', id)
    await updateDoc(deckRef, { name, icons, type })
    set((state) => ({
      decks: state.decks.map((deck) =>
        deck.id === id ? { ...deck, name, icons, type } : deck
      ),
    }))
  },
}))

export default useDeckStore
