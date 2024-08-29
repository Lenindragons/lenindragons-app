/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/require-default-props */
import styled from 'styled-components'
import bg from '../../../../assets/bg-lenindragons.webp'
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

export const Header = () => {
  return (
    <MenuComunista>
      <div className="top">
        <Options />
      </div>
    </MenuComunista>
  )
}
