import { Outlet, Navigate } from 'react-router-dom'
import { NewDashboard } from '../templates/new-dashboard/new-dashboard'
import { useAuth } from '../context/AuthContext'
import { Loading } from '../components/commons/loading/Loading'

const PrivateRoute = () => {
  const { loading, user } = useAuth()

  if (loading) {
    return <Loading />
  }

  return user ? (
    <NewDashboard>
      <Outlet />
    </NewDashboard>
  ) : (
    <Navigate to="/" />
  )
}

export default PrivateRoute
