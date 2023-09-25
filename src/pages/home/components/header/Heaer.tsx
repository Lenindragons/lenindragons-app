/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/require-default-props */
import styled from 'styled-components'
import ImageSlider from '../../../../components/slider/Slider'
import logo from '../../../../assets/logo.png'
import bg from '../../../../assets/bg-lenindragons.webp'
import { useAuth } from '../../../../context/AuthContext'
import { MainMenu } from '../../../../components/mainmenu/MainMenu'

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

  ul,
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

  ul {
    display: flex;
    align-items: center;
    gap: 32px;

    .options {
      display: flex;
      gap: 0;
    }

    .white,
    .black {
      border: 3px solid white;
      padding: 15px;
    }

    .white {
      background: white;
      a {
        color: black;
        font-weight: 700;
        text-decoration: none;
        &:hover {
          color: ${(props) => props.theme.colors.primary};
        }
      }
    }
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

const Login = () => {
  const { signInGoogle } = useAuth()
  return (
    <a href="#" onClick={signInGoogle}>
      Login
    </a>
  )
}

export const Header = () => {
  const events: any[] = []

  return (
    <MenuComunista>
      <div className="top">
        <LeninDragons width={150} />
        <MainMenu>
          <li>
            <ul className="options">
              <li className="black">Cadastre-se</li>
              <li className="white">
                <Login />
              </li>
            </ul>
          </li>
        </MainMenu>
      </div>
      <div className="bottom">
        <ImageSlider images={events.map((event: any) => event.image)} />
      </div>
    </MenuComunista>
  )
}
