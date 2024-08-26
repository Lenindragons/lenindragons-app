/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/require-default-props */
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import logo from '../../../../assets/fantasia-logo.png'
import bg from '../../../../assets/bg-plataform.webp'
import { MainMenu } from '../../../../components/mainmenu/MainMenu'
import Options from '../options'
import useIsMobile from '../../../../helpers/is-mobile'
import MobileHeader from '../header-mobile/MobileContainer'

const MenuContainer = styled.nav`
  background: url(${bg});
  position: relative;
  display: flex;
  justify-content: center;

  .top {
    display: flex;
    justify-content: space-between;
    width: 100%;
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

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;

    ul {
      flex-direction: column;
      width: 100%;

      li {
        margin: 8px 0;
        width: 100%;
        text-align: left;
      }
    }
  }
`

const PlataformLogoContainer = styled.figure`
  img {
    transition: transform 0.3s easy-in-out;

    &:hover {
      transform: scale(1.1);
    }
  }
`

type PlataformProps = {
  width?: number
}
const PlataformLogo = ({ width = 60 }: PlataformProps) => {
  return (
    <PlataformLogoContainer>
      <Link to="/">
        <img width={width} src={logo} alt="Fantasia Geek Store" />
      </Link>
    </PlataformLogoContainer>
  )
}

export const Header = () => {
  const isMobile = useIsMobile()

  const component = !isMobile ? (
    <MenuContainer>
      <div className="top">
        <PlataformLogo width={60} />
        <MainMenu>
          <Options />
        </MainMenu>
      </div>
    </MenuContainer>
  ) : (
    <MobileHeader />
  )

  return component
}
