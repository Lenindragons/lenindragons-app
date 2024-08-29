/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useAuth } from '../../../../context/AuthContext'

const Login = () => {
  const { signInGoogle } = useAuth()
  return (
    <a href="#" onClick={signInGoogle}>
      Login
    </a>
  )
}

const Logout = () => {
  const { logout } = useAuth()
  return (
    <a href="#" onClick={logout}>
      Sair
    </a>
  )
}

const ListContainerOptions = styled.ul`
  display: flex;
  gap: 0;

  li {
    padding: 15px !important;
    display: flex;
    justify-content: center;
    align-items: center;
    a {
      font-weight: 700;
      text-decoration: none;
      &:hover {
        color: ${(props) => props.theme.primary};
      }
    }
  }
`

const ListItemBlack = styled.li`
  border: 3px solid white;
  a {
    color: white;
  }
`

const ListItemWhite = styled.li`
  background: white;
  a {
    color: black;
  }
`

const Options = () => {
  const { user } = useAuth()

  return (
    <li>
      <ListContainerOptions>
        {user ? (
          <>
            <ListItemBlack>
              <Link to="/dashboard/profile">Olá, {user && user.name}</Link>
            </ListItemBlack>
            <ListItemWhite>
              <Logout />
            </ListItemWhite>
          </>
        ) : (
          <>
            <ListItemBlack>Cadastre-se</ListItemBlack>
            <ListItemWhite>
              <Login />
            </ListItemWhite>
          </>
        )}
      </ListContainerOptions>
    </li>
  )
}

export default Options
