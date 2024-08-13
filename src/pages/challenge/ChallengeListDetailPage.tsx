import { WebPageTemplate } from '../../templates/webpage/WebPage'
import { PlayerList } from './components/players-list/PlayerList'

export const ChallengeListDetailPage = () => {
  return (
    <WebPageTemplate>
      <header>
        <h1>Desafios</h1>
        <p>Desafios disponíveis para a comunidade</p>
      </header>
      <PlayerList />
    </WebPageTemplate>
  )
}
