import { Alert, Typography } from '@mui/material'
import { WarningAmber } from '@mui/icons-material'

/* eslint-disable react/jsx-no-useless-fragment */
export const ValuesAndPercentage = ({ seasonValues, seasonResume }: any) => {
  const getTopRanking = (value: number) => {
    if (value < seasonValues.top4?.max) {
      return 'Top 4'
    }
    if (value > seasonValues.top6?.min && value < seasonValues.top6?.max) {
      return 'Top 6'
    }

    return 'Top 8'
  }

  return (
    <>
      {seasonValues ? (
        <>
          <Typography variant="body1">
            <strong>Atual Top</strong>:{' '}
            {getTopRanking(seasonResume.totalPlayers * 5)}
          </Typography>
          <Typography variant="body1">
            <strong>Arrecadação atual: </strong>: R${' '}
            {seasonResume.totalPlayers * 5}
          </Typography>
          <Typography variant="body1">
            <strong>Mínimo</strong>: {seasonValues.top4?.min} -{' '}
            <strong>Máximo: </strong>
            {seasonValues.top4?.max}
          </Typography>
        </>
      ) : (
        <Alert severity="warning" variant="outlined" icon={<WarningAmber />}>
          Não foram definidos valores para essa temporada
        </Alert>
      )}
    </>
  )
}
