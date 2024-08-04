/* eslint-disable jsx-a11y/label-has-associated-control */
import HeaderComponent from './components/header/Header'
import { SideMenu } from '../../components/side-menu/side-menu'
import { DashboardContainer, HomeContainer, SideBar } from './style'
import logo from '../../assets/fantasia-logo.png'
import GearHammer from '../../assets/gear-hammer.svg'
import Parchment from '../../assets/parchment.svg'

export const Dashboard = ({ children }: any) => {
  return (
    <DashboardContainer>
      <HeaderComponent />
      <SideBar>
        <section>
          <img src={logo} alt="Fantasia Geek Store" width={150} height={150} />
        </section>

        <SideMenu
          items={[
            {
              id: 'side-menu-1',
              path: '/profile',
              label: 'Perfil',
              icon: GearHammer,
            },
            {
              id: 'side-menu-2',
              path: '/seasons',
              label: 'Temporadas',
              icon: Parchment,
            },
            {
              id: 'side-menu-3',
              path: '/players',
              label: 'Jogadores',
              icon: Parchment,
            },
          ]}
        />
      </SideBar>

      <HomeContainer>
        <main>{children}</main>
      </HomeContainer>
    </DashboardContainer>
  )
}
