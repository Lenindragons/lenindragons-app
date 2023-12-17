/* eslint-disable jsx-a11y/label-has-associated-control */
import { Avatar } from '@mui/material'
import HeaderComponent from './components/header/Header'
import { SideMenu } from './components/side-menu/SideMenu'
import { DashboardContainer, HomeContainer, SideBar } from './style'
import logo from '../../assets/logo.png'

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

        <SideMenu />
      </SideBar>

      <HomeContainer>
        <main>{children}</main>
      </HomeContainer>
    </DashboardContainer>
  )
}
