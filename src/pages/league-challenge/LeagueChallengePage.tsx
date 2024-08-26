import { WebPageTemplate } from '@/templates/webpage/WebPage'
import { ResultsList } from '../challenge/components/results-list/ResultsList'

export const LeagueChallengePage = () => {
  return (
    <WebPageTemplate>
      <header style={{ marginBottom: '20px', width: '100%' }}>
        <h2>Torneios de League Challenge de 2024</h2>
      </header>
      <ResultsList type="league_challenge" />
    </WebPageTemplate>
  )
}
