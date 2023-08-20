import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { ReactNode, createContext, useContext, useState } from 'react'
import { app } from '../services/firebaseConfig'

const provider = new GoogleAuthProvider()

const AuthContext = createContext({})

interface Props {
  children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<any>(null)
  const [, setCredential] = useState<any>(null)

  const auth = getAuth(app)

  const signInGoogle = () => {
    signInWithPopup(auth, provider)
      .then((res) => {
        setCredential(GoogleAuthProvider.credentialFromResult(res))
        setUser({
          name: res.user.displayName,
          email: res.user.email,
          image: res.user.photoURL,
        })
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
