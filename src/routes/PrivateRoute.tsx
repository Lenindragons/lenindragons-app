import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const PrivateRoute = () => {
  const { loading, user } = useAuth()

  if (loading) {
    return <>Carregando!</>
  }

  return user ? <Outlet /> : <Navigate to="/" />
}

export default PrivateRoute
