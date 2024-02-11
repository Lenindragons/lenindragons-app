import styled from 'styled-components'
import { useEffect } from 'react'
import { EventForm } from './forms/event/EventForm'
import { usePage } from '../../context/PageContext'
import { EventList } from '../../components/list/list'
import { Modal } from '../../components/commons/modal/Modal'
import { createEvent } from '../../services/events'

export const Box = styled.section`
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 16px;
  margin: 16px;
`

const Header = styled.header`
  margin-bottom: 15px;
`

export const EventPage = () => {
  const { setTitle } = usePage()

  useEffect(() => {
    setTitle('Eventos')
  }, [setTitle])

  return (
    <Box>
      <Header>
        <Modal label="Criar Evento">
          <EventForm callback={createEvent} />
        </Modal>
      </Header>
      <EventList />
    </Box>
  )
}
