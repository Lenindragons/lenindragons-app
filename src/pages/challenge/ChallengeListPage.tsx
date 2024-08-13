import { WebPageTemplate } from '../../templates/webpage/WebPage'
import { ResultsList } from './components/results-list/ResultsList'

export const ChallengeListPage = () => {
  return (
    <WebPageTemplate>
      <header style={{ marginBottom: '20px' }}>
        <h2>Torneios por Temporadas</h2>
      </header>
      <ResultsList />
    </WebPageTemplate>
  )
}
