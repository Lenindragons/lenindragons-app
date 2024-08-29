import { Outlet, Navigate } from 'react-router-dom'
import Dashboard from '../templates/new-dashboard/new-dashboard'
import { useAuth } from '../context/AuthContext'
import { Loading } from '../components/commons/loading/Loading'

const PrivateRoute = () => {
  const { loading, user } = useAuth()

  if (loading) {
    return <Loading />
  }

  return user ? (
    <Dashboard>
      <Outlet />
    </Dashboard>
  ) : (
    <Navigate to="/" />
  )
}

export default PrivateRoute
