import { styled } from 'styled-components'
import { Profile } from '../profile/Profile'

const Container = styled.header`
  display: flex;
  grid-area: header;
  padding: 25px;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  max-height: 124px;

  button {
    padding: 10px;
    font-size: 15px;
  }
`

const Header = () => {
  return (
    <Container>
      <h1>Titulo da Pagina</h1>
      <Profile />
    </Container>
  )
}

export default Header
