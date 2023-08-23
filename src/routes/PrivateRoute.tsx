import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Loading } from '../components/commons/loading/Loading'

const PrivateRoute = () => {
  const { loading, user } = useAuth()

  if (loading) {
    return <Loading />
  }

  return user ? <Outlet /> : <Navigate to="/" />
}

export default PrivateRoute
