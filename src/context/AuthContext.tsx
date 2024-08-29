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

const AuthContext = createContext({})

const AuthProvider = ({ children }: ContextProps) => {
  const [user, setUser] = useState<any | null>(null)
  const [loading, setLoadingStatus] = useState(true)
  const navigate = useNavigate()
  const { alertError } = useErrorHandling()

  const auth = getAuth(app)

  const getUserInfo = (userInfo: any) => {
    return (
      userInfo && {
        name: userInfo.displayName,
        email: userInfo.email,
        image: userInfo.photoURL,
      }
    )
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userInfo) => {
      if (userInfo) {
        setUser(getUserInfo(userInfo))
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
          type: 'customer',
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
    <AuthContext.Provider value={{ user, signInGoogle, loading, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = (): any => {
  return useContext(AuthContext)
}

export { AuthProvider, useAuth }
