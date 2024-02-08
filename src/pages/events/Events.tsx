import styled from 'styled-components'
import { useEffect } from 'react'
import CreateEventForm from '../../components/forms/event/CreateEventForm'
import { usePage } from '../../context/PageContext'
import { EventList } from '../../components/list/list'
import { Modal } from '../../components/commons/modal/Modal'

export const Box = styled.section`
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 16px;
  margin: 16px;

  h2 {
    font-size: 18px;
    margin-bottom: 8px;
  }

  div {
    font-size: 14px;
    color: #333;
  }

  /* Estilos para o formulário */
  form {
    display: grid;
    grid-template-columns: 1fr 1fr; /* Divide o formulário em duas colunas */
    gap: 20px; /* Espaço entre os elementos */
    margin: 0 auto;
    padding: 20px;
    background-color: #f2f2f2;
    border-radius: 8px;
  }

  /* Estilos para os campos de entrada */
  input[type='text'],
  textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
  }

  /* Estilos para os rótulos */
  label {
    font-weight: bold;
  }

  /* Estilos para o seletor de datas */
  .react-date-range {
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 10px;
  }
`

const Header = styled.header`
  padding: 15px;
`

export const EventPage = () => {
  // const [open, setOpen] = useState(false)
  const { setTitle } = usePage()
  // const { items } = useEvents()

  useEffect(() => {
    setTitle('Eventos')
  }, [setTitle])

  return (
    <Box>
      <Header>
        {/* <Button
          startIcon={<Icon component={Add} />}
          variant="outlined"
          onClick={() => setOpen(true)}
        >
          Criar Evento
        </Button>

        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box>
            <h2>Criar Evento</h2>
            <CreateEventForm />
          </Box>
        </Modal> */}
        <Modal label="Criar Evento">
          <CreateEventForm />
        </Modal>
      </Header>
      <EventList />
    </Box>
  )
}
