/* eslint-disable @typescript-eslint/no-shadow */
import {
  GoogleAuthProvider,
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
import { getUserByEmail } from '../services/user'

const AuthContext = createContext({})

const AuthProvider = ({ children }: ContextProps) => {
  const [actualUser, setUser] = useState<any | null>(null)
  const [loading, setLoadingStatus] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const navigate = useNavigate()
  const { alertError } = useErrorHandling()

  const auth = getAuth(app)

  const getUserInfo = (userInfo: any) => {
    return (
      userInfo && {
        name: userInfo.displayName,
        email: userInfo.email,
        image: userInfo.photoURL,
        role: 'customer',
      }
    )
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (userInfoFromGoogle) => {
      if (userInfoFromGoogle) {
        const userInfoFromFirebase = await getUserByEmail(
          userInfoFromGoogle?.email || ''
        )
        const info = userInfoFromFirebase || getUserInfo(userInfoFromGoogle)
        setUser(info)
        setLoadingStatus(false)
      }
    })

    return () => unsubscribe()
  }, [auth, navigate])

  useEffect(() => {
    if (actualUser) {
      setIsAdmin(actualUser.role === 'admin')
    }
  }, [actualUser])

  const logout = async () => {
    await signOut(auth)
    setUser(null)
    navigate('/')
  }

  const signInGoogle = async () => {
    const provider = new GoogleAuthProvider()
    try {
      const result = await signInWithPopup(auth, provider)
      const { user } = result

      const userDoc = doc(db, 'users', user.uid)
      const userSnapshot = await getDoc(userDoc)
      if (!userSnapshot.exists()) {
        await setDoc(userDoc, {
          name: user.displayName,
          email: user.email,
          image: user.photoURL,
          role: 'customer',
        })
      }
      const userData = userSnapshot.data()
      setUser({
        uid: user.uid,
        ...userData,
      })
      navigate('/dashboard/open')
    } catch (error) {
      alertError('Erro ao autenticar com o Google:', error)
    }
  }

  return (
    <AuthContext.Provider
      value={{ user: actualUser, signInGoogle, loading, logout, isAdmin }}
    >
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = (): any => {
  return useContext(AuthContext)
}

export { AuthProvider, useAuth }
