import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { Button, Tab, Tabs } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { usePage } from '@/context/PageContext'
import { EventList } from '@/components/list/list'
import { TabPanel } from '@/components/tab-panel'

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
  const [value, setValue] = useState(0)

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

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

      <Tabs value={value} onChange={handleChange}>
        <Tab label="Em Andamento" />
        <Tab label="Agendado" />
        <Tab label="Encerrado" />
      </Tabs>

      <TabPanel value={value} index={0} sx={{ pt: 1 }}>
        <EventList status="em andamento" />
      </TabPanel>

      <TabPanel value={value} index={1} sx={{ pt: 1 }}>
        <EventList status="agendado" />
      </TabPanel>

      <TabPanel value={value} index={2} sx={{ pt: 1 }}>
        <EventList status="encerrado" />
      </TabPanel>

    </Box>
  )
}
