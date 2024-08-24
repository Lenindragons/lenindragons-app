import { useEffect } from 'react'
import {
  Grid,
  Card,
  CardContent,
  Avatar,
  Typography,
  Box,
  Paper,
  Button,
} from '@mui/material'
import { usePage } from '../../../context/PageContext'
import { useAuth } from '../../../context/AuthContext'

export const ProfilePage = () => {
  const { setTitle } = usePage()
  const { user } = useAuth()

  useEffect(() => {
    setTitle('Seu Perfil')
  }, [setTitle])
  const users = {
    name: user.name,
    email: user.email,
    avatarUrl: user.image,
    lastLoginAt: user.lastSignInTime,
    lastSignInTime: user.lastSignInTime,
    joinedDate: user.creationTime,
  }

  return (
    <Box sx={{ padding: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Avatar
              alt={users.name}
              src={users.avatarUrl}
              sx={{
                width: 140,
                height: 140,
                margin: 'auto',
                backgroundColor: '#f0f0f0',
              }}
            />
            <Typography variant="h6" align="center" gutterBottom>
              {users.name}
            </Typography>
            <Typography variant="body2" align="center" color="textSecondary">
              {users.email}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Membro desde: {users.joinedDate}
              </Typography>
              {/* <Typography variant="body2" color="textSecondary" gutterBottom>
                Último login: {users.lastLoginAt}
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Logado desde: {users.lastSignInTime}
              </Typography> */}
              <Box sx={{ display: 'flex', gap: 2, marginTop: 2 }}>
                <Button variant="contained" color="primary">
                  Editar Perfil
                </Button>
                <Button variant="outlined" color="secondary">
                  Configurações
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}
