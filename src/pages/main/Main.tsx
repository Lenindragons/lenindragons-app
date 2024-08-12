/* eslint-disable react/require-default-props */
import { WebPageTemplate } from '../../templates/webpage/WebPage'
import RankingList from './components/ranking/RankingList'

export const MainPage = () => {
  return (
    <WebPageTemplate>
      <header>
        <h1>Ranking Fantasia Geek Store</h1>
        <h2>Temporada: Umbreon - Terças & Quintas</h2>
      </header>
      <RankingList />
    </WebPageTemplate>
  )
}
