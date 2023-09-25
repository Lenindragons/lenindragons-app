/* eslint-disable react/require-default-props */
import styled from 'styled-components'
import { Footer } from './components/footer/Footer'
import { Header } from './components/header/Heaer'
import { EventList } from './components/main/EventList'

const MainContainer = styled.main`
  width: 100%;
  max-width: 68em;
  margin: 0 auto;
  padding: 0 2.5em;
  font-family: Roboto, sans-serif;

  header {
    margin: 50px 0;
    font-style: italic;
  }

  header h1 {
    font-style: normal;
    font-weight: 700;
  }

  header h1,
  header p {
    margin-bottom: 16px;
    text-align: justify;
    color: #585858;
  }

  & > h2 {
    margin-bottom: 16px;
    font-style: normal;
    font-weight: 700;
  }
`

export const Home = () => {
  return (
    <>
      <Header />
      <MainContainer>
        <header>
          <h1>Lenindragons</h1>
          <p>
            Etiam quis viverra lorem, in semper lorem. Sed nisl arcu euismod sit
            amet nisi euismod sed cursus arcu elementum ipsum arcu vivamus quis
            venenatis orci lorem ipsum et magna feugiat veroeros aliquam. Lorem
            ipsum dolor sit amet nullam dolore.
          </p>
        </header>
        <EventList />
      </MainContainer>
      <Footer />
    </>
  )
}
