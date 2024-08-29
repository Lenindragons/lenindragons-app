import React from 'react'
import { Box, Container, Typography, Button } from '@mui/material'
import { Link } from 'react-router-dom'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'

export const NotFoundPage: React.FC = () => {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          textAlign: 'center',
        }}
      >
        <ErrorOutlineIcon sx={{ fontSize: 80, color: 'error.main' }} />
        <Typography variant="h1" component="h1" gutterBottom>
          404
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          Página não encontrada
        </Typography>
        <Typography variant="body1" gutterBottom>
          Desculpe, a página que você está procurando não existe.
        </Typography>
        <Button variant="contained" color="primary" component={Link} to="/">
          Voltar para a página inicial
        </Button>
      </Box>
    </Container>
  )
}
