/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/require-default-props */
import styled from 'styled-components'
import logo from '../../../../assets/fantasia-logo.png'
import bg from '../../../../assets/bg-lenindragons.webp'
import { MainMenu } from '../../../../components/mainmenu/MainMenu'
import Options from '../options'

const MenuComunista = styled.nav`
  background: url(${bg});
  position: relative;
  display: flex;
  justify-content: center;

  .top {
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: 68em;
    padding: 16px 32px;
  }

  .bottom {
    display: flex;
  }

  figure.stalin,
  figure.lenin {
    position: absolute;
    bottom: -3px;
    z-index: 9999;
  }

  figure.stalin {
    left: 0;
  }

  figure.lenin {
    right: 0;
  }
`

type LeninDragonsProps = {
  width?: number
}
const LeninDragons = ({ width = 80 }: LeninDragonsProps) => {
  return (
    <figure>
      <img width={width} src={logo} alt="logo lenindragons" />
    </figure>
  )
}

export const Header = () => {
  return (
    <MenuComunista>
      <div className="top">
        <LeninDragons width={150} />
        <MainMenu>
          <Options />
        </MainMenu>
      </div>
    </MenuComunista>
  )
}
