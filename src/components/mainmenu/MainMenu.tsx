/* eslint-disable react/require-default-props */
import { ReactNode } from 'react'
import styled from 'styled-components'

type MainMenuProps = {
  children?: ReactNode
}

const MenuContainer = styled.ul`
  display: flex;
  align-items: center;
  gap: 32px;

  li {
    color: white;
    list-style: none;
    padding: 0;
    font-style: regular;
    text-transform: uppercase;
    font-size: 17px;
    &:hover {
      color: ${(props) => props.theme.colors.primary};
      cursor: pointer;
    }
  }
`

export const MainMenu = ({ children }: MainMenuProps) => {
  return (
    <MenuContainer>
      <li>Rankings</li>
      <li>Regras</li>
      {children}
    </MenuContainer>
  )
}
