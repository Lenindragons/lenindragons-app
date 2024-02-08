/* eslint-disable jsx-a11y/label-has-associated-control */
import { Avatar } from '@mui/material'
import HeaderComponent from './components/header/Header'
import { SideMenu } from '../../components/side-menu/side-menu'
import { DashboardContainer, HomeContainer, SideBar } from './style'
import logo from '../../assets/logo.png'
import GearHammer from '../../assets/gear-hammer.svg'
import Parchment from '../../assets/parchment.svg'

export const Dashboard = ({ children }: any) => {
  return (
    <DashboardContainer>
      <HeaderComponent />
      <SideBar>
        <section>
          <Avatar
            alt="LeninDragons"
            src={logo}
            sx={{ width: 150, height: 150 }}
          />
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
              path: '/event',
              label: 'Eventos',
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
