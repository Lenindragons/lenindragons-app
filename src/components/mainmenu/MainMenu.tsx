/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/require-default-props */
import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'

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
    font-weight: bold;
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
    position: relative;
    display: inline-block;
    a {
      color: white;
      text-decoration: none;
      &:hover {
        color: ${(props) => props.theme.colors.primary};
      }
    }

    &:hover .menu-item-dropdown {
      display: flex;
      flex-direction: column;
      gap: 5px;
      width: auto;
    }

    .menu-item-dropdown {
      display: none;
      position: absolute;
      background-color: #222;
      z-index: 1;
      list-style: none;
      padding: 10px;
      border-radius: 5px;
      margin: 0;
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
      li {
        width: 200px;
        padding: 10px;
        a {
          color: white;
          text-decoration: none;
          display: inline-block;
          width: 100%;
          min-width: 100%;
        }
      }
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
        <Link
          to="#"
          style={{
            display: 'flex',
            justifyItems: 'center',
            alignItems: 'center',
          }}
        >
          Torneios <ArrowDropDownIcon />
        </Link>

        <ul className="menu-item-dropdown">
          <li>
            <Link to="/challenges">Liga Pokemon</Link>
          </li>
          <li>
            <Link to="/league-challenge">League Challenge</Link>
          </li>
          {/* <li>
            <Link to="/league-cup">League cup</Link>
          </li> */}
        </ul>
      </li>
      <li className="menu-item">
        <Link to="/rules">Regras</Link>
      </li>
      {children}
    </MenuContainer>
  )
}
