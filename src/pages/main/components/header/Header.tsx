/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/require-default-props */
import styled from 'styled-components'
import ImageSlider from '../../../../components/slider/Slider'
import logo from '../../../../assets/logo.png'
import bg from '../../../../assets/bg-lenindragons.webp'
import { MainMenu } from '../../../../components/mainmenu/MainMenu'
import Options from '../options'

const MenuComunista = styled.nav`
  background: url(${bg});
  position: relative;

  .top {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 16px 32px;
  }

  .bottom {
    min-height: 500px;
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
  const events: any[] = []

  return (
    <MenuComunista>
      <div className="top">
        <LeninDragons width={150} />
        <MainMenu>
          <Options />
        </MainMenu>
      </div>
      <div className="bottom">
        <ImageSlider images={events.map((event: any) => event.image)} />
      </div>
    </MenuComunista>
  )
}
