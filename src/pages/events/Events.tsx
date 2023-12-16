import styled from 'styled-components'
import { Events } from '../../components/event-list/Events'
import CreateEventForm from '../../components/forms/event/CreateEventForm'

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

    max-width: 800px;
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

export const EventPage = () => {
  return (
    <>
      <Box>
        <h2>Criar Evento</h2>
        <CreateEventForm />
      </Box>

      <Box>
        <h2>Listagem de Eventos</h2>
        <Events />
      </Box>
    </>
  )
}
