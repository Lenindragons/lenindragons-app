/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/no-array-index-key */
import { Skeleton } from '@mui/material'
import { Suspense, lazy } from 'react'
import { useParams } from 'react-router-dom'
import { WebPageTemplate } from '@/templates/webpage/WebPage'
import { usePlayerItem } from './hooks/player-list/usePlayersList'

import { getDate } from '@/helpers/format-date'
import { PlayerItemsContextType } from './hooks/player-list/types'

const PlayerList = lazy(() => import('./components/players-list/PlayerList'))

const LoadingTableSkeleton = () => {
  return <Skeleton variant="rectangular" width="100%" height="100%" />
}

export const ChallengeListDetailPage = () => {
  const { id = '' } = useParams()
  const { challenge }: PlayerItemsContextType = usePlayerItem(id)

  return (
    <WebPageTemplate>
      <header style={{ marginBottom: '20px' }}>
        <h2>Resutado em {(challenge as any)?.season?.name}</h2>
        <p>
          <strong>Data:</strong>{' '}
          {challenge?.dates &&
            getDate(challenge?.dates[0].startDate, 'dd MMM yyyy')}
        </p>
      </header>
      <Suspense fallback={<LoadingTableSkeleton />}>
        <PlayerList />
      </Suspense>
    </WebPageTemplate>
  )
}
