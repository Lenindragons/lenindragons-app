import {
  GoogleAuthProvider,
  UserInfo,
  getAuth,
  signInWithPopup,
} from 'firebase/auth'
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
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
  const [user, setUser] = useState<User>({ name: '', email: '', image: '' })
  const [, setCredential] = useState<any>(null)

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
    auth.onAuthStateChanged((userInfo) => {
      if (userInfo) {
        setUser(getUserInfo(userInfo))
      }
    })
  }, [auth])

  const signInGoogle = () => {
    signInWithPopup(auth, provider)
      .then((res) => {
        setCredential(GoogleAuthProvider.credentialFromResult(res))
        setUser(getUserInfo(res.user))
      })
      .catch((err) => {
        console.log(GoogleAuthProvider.credentialFromError(err))
      })
  }

  return (
    <AuthContext.Provider value={{ user, signInGoogle }}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = (): any => {
  return useContext(AuthContext)
}

export { AuthProvider, useAuth }
