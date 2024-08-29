/* eslint-disable jsx-a11y/label-has-associated-control */
import HeaderComponent from './components/header/Header'
import { SideMenu } from './components/side-menu/SideMenu'
import { DashboardContainer, HomeContainer, SideBar } from './style'

export const Dashboard = ({ children }: any) => {
  return (
    <DashboardContainer>
      <HeaderComponent />
      <SideBar>
        <SideMenu />
      </SideBar>

      <HomeContainer>
        <main>{children}</main>
      </HomeContainer>
    </DashboardContainer>
  )
}
