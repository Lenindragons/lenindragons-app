/* eslint-disable @typescript-eslint/no-shadow */
import { useState, useEffect } from 'react'
import { Container, Typography } from '@mui/material'
import UserTable from './components/table'
import { deleteUser, getUsers } from '../../../../services/user'

interface User {
  uid: string
  name: string
  email: string
  image: string
  type: string
}

export const UserPage = () => {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    const fetchUsers = async () => {
      const users = (await getUsers()) || []
      setUsers(users)
    }
    fetchUsers()
  }, [])

  const handleDeleteUser = async (uid: string) => {
    await deleteUser(uid)
    setUsers(users.filter((u) => u.uid !== uid))
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Usuários
      </Typography>
      <UserTable users={users} onDelete={handleDeleteUser} />
    </Container>
  )
}
