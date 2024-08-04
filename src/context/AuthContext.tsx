import {
  GoogleAuthProvider,
  UserInfo,
  getAuth,
  signInWithPopup,
  signOut,
} from 'firebase/auth'
import { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { app } from '../services/firebaseConfig'
import { ContextProps } from './ContextProps'
import { useErrorHandling } from './ErrorContext'
import { formatUserMetadata } from '../helpers/format-date'

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

  const getUserInfo = (userInfo: UserInfo) => {
    return (
      userInfo && {
        name: userInfo.displayName,
        email: userInfo.email,
        image: userInfo.photoURL,
        ...formatUserMetadata(userInfo.metadata),
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

  const signInGoogle = () => {
    signInWithPopup(auth, provider)
      .then((res) => {
        setUser(getUserInfo(res.user))
      })
      .then(() => navigate('/home'))
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
