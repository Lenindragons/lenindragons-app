/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @typescript-eslint/no-shadow */
import { useParams } from 'react-router-dom'
import { useEffect, useState, Suspense, lazy } from 'react'
import { Timestamp } from 'firebase/firestore'
import { Box } from '@mui/material'
import { WebPageTemplate } from '@/templates/webpage/WebPage'
import { getChallengeByDate } from '@/services/challenge'
import { getPlayers } from '@/services/players'
import { Loading } from '@/components/commons/loading/Loading'

const FlipCard = lazy(() => import('@/components/flip-card/FlipCard'))
const LazyAchievementsArea = lazy(() => import('./components/achievements-area/AchievementsArea'))
const LazyAchievementsResume = lazy(() => import('./components/achievements-resume/AchievementsResume'))

export const PlayerPage = () => {
  const { id } = useParams<{ id: string }>()
  const playerId = id || ''
  const [challenges, setChallenges] = useState([])
  const [players, setPlayers] = useState<any[]>([])
  const [hasAchievements, setHasAchievements] = useState(false)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    const fetchChallenges = async () => {
      const actualDate = Timestamp.now()
      getChallengeByDate(actualDate, setChallenges)
      setLoading(false)
    }

    const fetchPlayers = async () => {
      const allPlayers = (await getPlayers()) || []
      setPlayers(allPlayers)
      setLoading(false)
    }

    fetchChallenges()
    fetchPlayers()
  }, [])

  const profilePlayer = players.find((p) => p.id === playerId)

  if (players.length === 0 || challenges.length === 0 || isLoading) {
    return <WebPageTemplate><Loading /></WebPageTemplate>
  }

  return (<WebPageTemplate>
    <Box sx={{ position: 'relative' }}>
      <Suspense fallback={<Loading />}>
        <FlipCard
          showLabel={hasAchievements}
          front={
            <LazyAchievementsResume
              profilePlayer={profilePlayer}
              challenges={challenges}
              playerId={playerId}
              id={id}
              players={players}
            />
          }
          back={
            <LazyAchievementsArea
              profilePlayer={profilePlayer}
              setHasAchievements={setHasAchievements}
            />
          }
          frontLabel={`Ver atividades de ${profilePlayer?.name}`}
          backLabel={`Voltar para o perfil de ${profilePlayer?.name}`} />
      </Suspense>
    </Box>
  </WebPageTemplate>)
}

