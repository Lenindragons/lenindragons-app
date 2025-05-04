import styled from 'styled-components'
import { useState } from 'react'
import { Button, Tab, Tabs } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { EventList } from '@/components/list/list'
import { TabPanel } from '@/components/tab-panel'
import { EventStatus } from '@/utils/getChallengeStatus'

export const Box = styled.section`
  padding: 16px;
  margin: 16px;
`

const Header = styled.header`
  margin-bottom: 15px;
`

export const SeasonsPage = () => {
  const navigate = useNavigate()
  const [value, setValue] = useState(0)

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Box>
      <Header>
        <Button variant="contained" onClick={() => navigate('/seasons/create')}>
          Criar Circuito
        </Button>
      </Header>

      <Tabs value={value} onChange={handleChange}>
        <Tab label={EventStatus.IN_PROGRESS} />
        <Tab label={EventStatus.SCHEDULED} />
        <Tab label={EventStatus.FINISHED} />
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
