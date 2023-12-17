import styled from 'styled-components'
import bg from '../../assets/bg-lenindragons.webp'

export const HomeContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-area: main;
  background-color: #fff;
  -webkit-box-shadow: inset 21px 23px 28px -29px rgba(0, 0, 0, 0.43);
  -moz-box-shadow: inset 21px 23px 28px -29px rgba(0, 0, 0, 0.43);
  box-shadow: inset 21px 23px 28px -29px rgba(0, 0, 0, 0.43);
  min-height: 100vh;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
  border-radius: 5px 0 0 0;

  main {
    padding: 5px;
  }
`

export const DashboardContainer = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr 1fr;
  grid-template-rows: 1fr;
  background: url(${bg});
  min-height: 100vh;

  grid-template-areas:
    'sidebar header header'
    'sidebar main main'
    'sidebar main main';
`

export const SideBar = styled.aside`
  grid-area: sidebar;

  section {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 30px 0;
  }

  nav {
    ul {
      list-style: none;
      padding: 0;
      margin: 0;

      li {
        padding: 10px;
        cursor: pointer;
        transition: 0.3s;
        color: #fff;
        font-weight: bold;
        font-size: 16px;

        &:hover {
          background-color: #fff;
          color: #333;
        }
      }
    }
  }
`
