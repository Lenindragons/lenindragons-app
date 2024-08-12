import {
  GoogleAuthProvider,
  UserInfo,
  getAuth,
  signInWithPopup,
  signOut,
} from 'firebase/auth'
import { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { app, db } from '../services/firebaseConfig'
import { ContextProps } from './ContextProps'
import { useErrorHandling } from './ErrorContext'
import { formatUserMetadata } from '../helpers/format-date'
import { UserType } from '../types/Player'

const provider = new GoogleAuthProvider()

const AuthContext = createContext({})

type User = {
  name: string | null
  email: string | null
  image: string | null
}

const AuthProvider = ({ children }: ContextProps) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoadingStatus] = useState(true)
  const navigate = useNavigate()
  const { alertError } = useErrorHandling()

  const auth = getAuth(app)

  const getUserInfo = async (userInfo: UserInfo): Promise<User | null> => {
    const userDoc = doc(db, 'players', userInfo.uid)
    const userSnapshot = await getDoc(userDoc)

    if (!userSnapshot.exists()) {
      const player = {
        name: userInfo.displayName,
        email: userInfo.email,
        image: userInfo.photoURL,
        type: UserType.PLAYER,
        ...formatUserMetadata(userInfo.metadata),
      }
      await setDoc(userDoc, player)
      return player
    }
    return userSnapshot.data() as User | null
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (userInfo) => {
      if (userInfo) {
        setUser(await getUserInfo(userInfo))
        setLoadingStatus(false)
      }
    })

    return () => unsubscribe()
  }, [auth, navigate])

  const logout = async () => {
    await signOut(auth)
    setUser(null)
    navigate('/')
  }

  const signInGoogle = () => {
    signInWithPopup(auth, provider)
      .then((res) => {
        setUser(getUserInfo(res.user))
      })
      .then(() => navigate('/profile'))
      .catch((err) => {
        const { email, message, code } = err
        alertError(`[${code}:${email}]: ${message}`)
      })
  }

  return (
    <AuthContext.Provider value={{ user, signInGoogle, loading, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = (): any => {
  return useContext(AuthContext)
}

export { AuthProvider, useAuth }
