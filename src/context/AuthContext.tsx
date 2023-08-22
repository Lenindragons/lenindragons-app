import {
  GoogleAuthProvider,
  UserInfo,
  getAuth,
  signInWithPopup,
  signOut,
} from 'firebase/auth'
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { useNavigate } from 'react-router-dom'
import { app } from '../services/firebaseConfig'

const provider = new GoogleAuthProvider()

const AuthContext = createContext({})

type Props = {
  children: ReactNode
}

type User = {
  name: string | null
  email: string | null
  image: string | null
}

const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoadingStatus] = useState(true)
  const navigate = useNavigate()

  const auth = getAuth(app)

  const getUserInfo = (userInfo: UserInfo) => {
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
        navigate('/home')
      }
    })

    return unsubscribe
  }, [auth, navigate])

  const logout = async () => {
    await signOut(auth)
    navigate('/')
  }

  const signInGoogle = () => {
    signInWithPopup(auth, provider)
      .then((res) => {
        const credential = GoogleAuthProvider.credentialFromResult(res)
        const token = credential?.accessToken || ''
        setUser(getUserInfo(res.user))
        sessionStorage.setItem('@AuthFirebase:token', token)
        sessionStorage.setItem('@AuthFirebase:user', JSON.stringify(user))
      })
      .catch((err) => {
        const { email, message, code } = err
        const credential = GoogleAuthProvider.credentialFromError(err)
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
