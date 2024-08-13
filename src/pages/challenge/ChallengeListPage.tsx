import { WebPageTemplate } from '../../templates/webpage/WebPage'
import { ResultsList } from './components/results-list/ResultsList'

export const ChallengeListPage = () => {
  return (
    <WebPageTemplate>
      <header>
        <h1>Desafios</h1>
        <p>Desafios disponíveis para a comunidade</p>
      </header>
      <ResultsList />
    </WebPageTemplate>
  )
}
