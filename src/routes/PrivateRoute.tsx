import { Outlet, Navigate } from 'react-router-dom'
import { NewDashboard } from '../templates/new-dashboard/new-dashboard'
import { useAuth } from '../context/AuthContext'
import { Loading } from '../components/commons/loading/Loading'

const PrivateRoute = ({ roles }: { roles: string[] }) => {
  const { loading, user } = useAuth()
  const hasRole = roles.includes(user?.role)

  if (loading) {
    return <Loading />
  }

  return user && hasRole ? (
    <NewDashboard>
      <Outlet />
    </NewDashboard>
  ) : (
    <Navigate to="/" />
  )
}

export default PrivateRoute
