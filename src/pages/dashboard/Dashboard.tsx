/* eslint-disable jsx-a11y/label-has-associated-control */
import styled from 'styled-components'
import { useAuth } from '../../context/AuthContext'
import CreateEventForm from '../../components/forms/event/CreateEventForm'
import { Events } from '../../components/event-list/Events'

const Header = styled.header`
  display: flex;
  padding: 10px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 5px solid;
  button {
    padding: 10px;
    font-size: 15px;
  }
`

const Box = styled.section`
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

const HomeContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`

export const Dashboard = () => {
  const { logout, user } = useAuth()

  return (
    <>
      <Header>
        <h1>Seja bem vinda, {user.name}</h1>
        <button type="button" onClick={logout}>
          Deslogar
        </button>
      </Header>
      <HomeContainer>
        <Box>
          <h2>Criar Evento</h2>
          <CreateEventForm />
        </Box>

        <Box>
          <h2>Listagem de Eventos</h2>
          <Events />
        </Box>
      </HomeContainer>
    </>
  )
}
