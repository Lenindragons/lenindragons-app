/* eslint-disable react/require-default-props */
import { ReactNode } from 'react'

type MainMenuProps = {
  children?: ReactNode
}

export const MainMenu = ({ children }: MainMenuProps) => {
  return (
    <ul>
      <li>Traga seu evento</li>
      <li>Projetos</li>
      <li>Sobre</li>
      <li>Contato</li>
      <li>APOIA.SE</li>
      {children}
    </ul>
  )
}
