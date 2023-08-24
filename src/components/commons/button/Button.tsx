import { AwesomeButton } from 'react-awesome-button'
import 'react-awesome-button/dist/styles.css'
import styled from 'styled-components'
import { ButtonProps } from './types'

const ButtonContainer = styled.div`
  grid-column: span 2;

  button {
    width: 100% !important;
  }
`

const Button = ({ children, onClick, type = 'primary' }: ButtonProps) => {
  return (
    <ButtonContainer>
      <AwesomeButton onPress={onClick} type={type}>
        {children}
      </AwesomeButton>
    </ButtonContainer>
  )
}

export default Button
