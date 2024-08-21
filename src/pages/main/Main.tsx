/* eslint-disable react/require-default-props */
import { WebPageTemplate } from '../../templates/webpage/WebPage'
import RankingList from './components/ranking/RankingList'

export const MainPage = () => {
  return (
    <WebPageTemplate>
      <RankingList />
    </WebPageTemplate>
  )
}
