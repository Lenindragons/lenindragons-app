import styled from 'styled-components'
import bossOrder from '../../../../assets/boss-order.png'
import redBlue from '../../../../assets/red-blue.png'
import { MainMenu } from '../../../../components/mainmenu/MainMenu'

const FooterContainer = styled.footer`
  background: ${(props) => props.theme.colors.primary};
  padding: 50px 16px;
  margin-top: 50px;
  color: white;
  position: relative;

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
`
export const Footer = () => {
  return (
    <FooterContainer>
      <div>
        <figure className="stalin">
          <img src={redBlue} alt="red" width={400} />
        </figure>
        <div className="main">
          <MainMenu />
        </div>
        <figure className="lenin">
          <img src={bossOrder} alt="boss-order" width={500} />
        </figure>
      </div>
    </FooterContainer>
  )
}
