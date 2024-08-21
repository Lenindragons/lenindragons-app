import styled from 'styled-components'
import { WebPageTemplate } from '../../templates/webpage/WebPage'
import { ResultsList } from './components/results-list/ResultsList'
import redBlue from '../../assets/red-blue.png'

const FigureContainer = styled.figure`
  margin-top: 50px;
  margin-bottom: 50px;
`

export const ChallengeListPage = () => {
  return (
    <WebPageTemplate>
      <header style={{ marginBottom: '20px' }}>
        <h2>Torneios por Temporadas</h2>
      </header>
      <ResultsList />
      <FigureContainer>
        <img src={redBlue} alt="red" width={400} />
      </FigureContainer>
    </WebPageTemplate>
  )
}
