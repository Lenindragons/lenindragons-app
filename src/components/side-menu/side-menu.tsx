/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

interface SideMenuItem {
  id: string
  label: string
  path: string
  icon?: string
}

const SideMenuStructure = styled.ul`
  list-style: none;
  margin: 0px 15px 0px 10px;

  li {
    margin-bottom: 10px;
    display: flex;
    a {
      display: flex;
      padding: 25px;
      flex: 1;
      text-decoration: none;
      color: #fff;
      font-size: 20px;
      font-weight: 600;
      font-size: 15px;
    }

    img {
      width: 40px;
      margin-left: 15px;
    }

    &:hover,
    &:focus,
    &:active,
    &.active {
      background-color: #3a3b3d;
      border-radius: 5px;
      cursor: pointer;
    }
  }
`

export const SideMenu = ({ items }: { items: SideMenuItem[] }) => {
  const [active, setActive] = useState(
    localStorage.getItem('side-menu-active') || items[0].id
  )

  useEffect(() => {
    const activeItem = localStorage.getItem('side-menu-active')
    if (activeItem) {
      setActive(activeItem)
    }
  }, [])

  const handleClick = (id: string) => () => {
    setActive(id)
    localStorage.setItem('side-menu-active', id)
  }

  const isActive = (id: string) => {
    return active === id ? 'active' : ''
  }

  return (
    <SideMenuStructure>
      {items.map((item: SideMenuItem) => (
        <li
          key={item.id}
          onClick={handleClick(item.id)}
          className={isActive(item.id)}
        >
          <img src={item.icon} alt="" />
          <Link to={item.path}>{item.label}</Link>
        </li>
      ))}
    </SideMenuStructure>
  )
}
