import styled from 'styled-components'
import { useEffect } from 'react'
import { EventForm } from './forms/event/EventForm'
import { usePage } from '@/context/PageContext'
import { EventList } from '@/components/list/list'
import { Modal } from '@/components/commons/modal/Modal'
import { createEvent } from '@/services/events'

export const Box = styled.section`
  padding: 16px;
  margin: 16px;
`

const Header = styled.header`
  margin-bottom: 15px;
`

export const SeasonsPage = () => {
  const { setTitle } = usePage()

  useEffect(() => {
    setTitle('Temporadas')
  }, [setTitle])

  return (
    <Box>
      <Header>
        <Modal label="Criar temporada">
          <EventForm callback={createEvent} data={[]} />
        </Modal>
      </Header>
      <EventList />
    </Box>
  )
}
