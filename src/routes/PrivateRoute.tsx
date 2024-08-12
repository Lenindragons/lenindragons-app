import { Outlet, Navigate } from 'react-router-dom'
import React from 'react'
import { Dashboard } from '../templates/dashboard/Dashboard'
import { useAuth } from '../context/AuthContext'
import { Loading } from '../components/commons/loading/Loading'

interface PrivateRouteProps {
  allowedTypes: string[]
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ allowedTypes }) => {
  const { loading, user } = useAuth()

  if (loading) {
    return <Loading />
  }

  return allowedTypes.includes(user.type) ? (
    <Dashboard>
      <Outlet />
    </Dashboard>
  ) : (
    <Navigate to="/" />
  )
}

export default PrivateRoute
