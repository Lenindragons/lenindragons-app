import { Skeleton } from '@mui/material'
import { Suspense, lazy } from 'react'

const Options = lazy(() => import('./Options'))

const Loading = () => {
  return (
    <Skeleton
      sx={{ bgcolor: 'grey.900' }}
      variant="rectangular"
      width={210}
      height={56}
    />
  )
}

const SuspensedOptions = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Options />
    </Suspense>
  )
}

export default SuspensedOptions
