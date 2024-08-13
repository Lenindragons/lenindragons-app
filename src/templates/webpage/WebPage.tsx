/* eslint-disable react/prop-types */
import styled from 'styled-components'
import { Header } from './components/header/Header'
import { Footer } from './components/footer/Footer'

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

export const WebPageTemplate = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <>
      <Header />
      <MainContainer style={{ marginBottom: '300px' }}>
        {children}
      </MainContainer>
      <Footer />
    </>
  )
}
