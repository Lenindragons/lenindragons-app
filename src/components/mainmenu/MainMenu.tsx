/* eslint-disable react/require-default-props */
import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
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
    text-decorarion: none;
    font-size: 17px;
    &:hover {
      color: ${(props) => props.theme.colors.primary};
      cursor: pointer;
    }
  }
  .menu-item {
    a {
      color: white;
      text-decoration: none;
    }
  }
`

export const MainMenu = ({ children }: MainMenuProps) => {
  return (
    <MenuContainer>
      <li className="menu-item">
        <Link to="/">Home</Link>
      </li>
      <li className="menu-item">
        <Link to="/ranking">Rankings</Link>
      </li>
      <li className="menu-item">
        <Link to="/challenges">Torneios</Link>
      </li>
      <li className="menu-item">
        <Link to="/rules">Regras</Link>
      </li>
      {children}
    </MenuContainer>
  )
}
