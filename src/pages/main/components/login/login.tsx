import React from 'react'
import { Button, Box, Container } from '@mui/material'
import { Google as GoogleIcon } from '@mui/icons-material'
import { useAuth } from '../../../../context/AuthContext'

export const Login: React.FC = () => {
  const { signInGoogle } = useAuth()
  const handleLogin = () => {
    signInGoogle()
  }

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
        }}
      >
        <Button
          variant="contained"
          color="primary"
          startIcon={<GoogleIcon />}
          onClick={handleLogin}
        >
          Logar com Gmail
        </Button>
      </Box>
    </Container>
  )
}
