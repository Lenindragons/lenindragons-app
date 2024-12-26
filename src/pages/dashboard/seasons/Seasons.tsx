import styled from 'styled-components'
import { useEffect } from 'react'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { usePage } from '@/context/PageContext'
import { EventList } from '@/components/list/list'

export const Box = styled.section`
  padding: 16px;
  margin: 16px;
`

const Header = styled.header`
  margin-bottom: 15px;
`

export const SeasonsPage = () => {
  const { setTitle } = usePage()
  const navigate = useNavigate()

  useEffect(() => {
    setTitle('Temporadas')
  }, [setTitle])

  return (
    <Box>
      <Header>
        <Button variant="contained" onClick={() => navigate('/seasons/create')}>
          Criar Temporada
        </Button>
      </Header>
      <EventList />
    </Box>
  )
}
