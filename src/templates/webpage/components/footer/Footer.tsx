import styled from 'styled-components'
import { MainMenu } from '../../../../components/mainmenu/MainMenu'

const FooterContainer = styled.footer`
  background: ${(props) => props.theme.colors.primary};
  padding: 50px 16px;
  margin-top: 50px;
  color: white;
  position: relative;

  figure.stalin,
  figure.boss-order {
    position: absolute;
    bottom: -3px;
    z-index: 9999;
  }

  figure.stalin {
    left: 0;
  }

  figure.boss-order {
    right: 0;
    img {
      max-width: 500px;
    }
  }

  .main {
    width: 100%;
    max-width: 68em;
    margin: 0 auto;
    padding: 0 2.5em;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-areas:
      'menu parceiras parceiras parceiras'
      'menu parceiras parceiras parceiras'
      'menu newsletter newsletter socialnetworks'
      'menu newsletter newsletter socialnetworks'
      'credits credits credits credits';
  }

  @media (max-width: 768px) {
    .main,
    figure.stalin {
      display: none;
    }

    figure.boss-order {
      width: 100%;
      display: flex;
      justify-content: center;
      img {
        width: 100%;
        min-width: 300px;
      }
    }
  }
`
export const Footer = () => {
  return (
    <FooterContainer>
      <div>
        <div className="main">
          <MainMenu />
        </div>
      </div>
    </FooterContainer>
  )
}
