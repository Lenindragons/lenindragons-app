import styled from 'styled-components'
import { useAuth } from '../../context/AuthContext'

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

export const Home = () => {
  const { logout, user } = useAuth()

  return (
    <Header>
      <h1>Seja bem vinda, {user.name}</h1>
      <button type="button" onClick={logout}>
        Deslogar
      </button>
    </Header>
  )
}
