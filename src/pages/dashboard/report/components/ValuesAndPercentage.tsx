/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unsafe-optional-chaining */
import {
  Alert,
  Divider,
  Paper,
  Slider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { WarningAmber } from '@mui/icons-material'

enum SeasonRank {
  TOP_4 = 'TOP 4',
  TOP_6 = 'TOP 6',
  TOP_8 = 'TOP 8',
}

/* eslint-disable react/jsx-no-useless-fragment */
export const ValuesAndPercentage = ({
  seasonValues,
  seasonResume,
  rankedPlayers,
}: any) => {
  const getTopRanking = (value: number) => {
    if (value >= seasonValues.top8?.min) {
      return {
        name: SeasonRank.TOP_8,
        percentages: seasonValues.top8?.percentByPosition,
        slice: 8,
      }
    }
    if (value > seasonValues.top6?.min) {
      return {
        name: SeasonRank.TOP_6,
        percentages: seasonValues.top6?.percentByPosition,
        slice: 6,
      }
    }

    return {
      name: SeasonRank.TOP_4,
      percentages: seasonValues.top4?.percentByPosition,
      slice: 4,
    }
  }

  const marks = [
    {
      value: seasonValues?.top4?.min,
      label: 'R$ 0',
    },
    {
      value: seasonValues?.top6?.min,
      label: `R$${seasonValues?.top4?.max}`,
    },
    {
      value: seasonValues?.top8?.min,
      label: `R$${seasonValues?.top8?.min}`,
    },
  ]

  const getPrizeValue = (total: number, place: number) => {
    return total * (getTopRanking(total)?.percentages[place - 1]?.value / 100)
  }

  const total = seasonResume?.playersValues || 0

  return (
    <>
      {seasonValues ? (
        <>
          <Typography variant="body1">
            No momento a premiação está apenas para o{' '}
            <strong>{getTopRanking(total).name}</strong>
          </Typography>
          <Typography variant="body1">
            Com um total arrecadado de <strong>R$ {total.toFixed(2)}</strong>
          </Typography>
          <br />
          {getTopRanking(total).slice < 6 && (
            <Alert severity="info" variant="outlined">
              <Typography variant="body1">
                Para alcançar o <strong>TOP 6</strong> é necessário valor maior
                que <strong>R$ {seasonValues.top4?.max}</strong>
              </Typography>
            </Alert>
          )}
          <br />
          {getTopRanking(total).slice < 8 && (
            <Alert severity="info" variant="outlined">
              <Typography variant="body1">
                Para alcançar o <strong>TOP 8</strong> é necessário valor maior
                que <strong>R$ {seasonValues.top8?.min}</strong>
              </Typography>
            </Alert>
          )}
          <Divider sx={{ marginY: 1 }} />
          <Typography variant="h6">Progresso da arrecadação:</Typography>
          <Slider
            marks={marks}
            color="info"
            value={total}
            min={seasonValues.top4?.min || 0}
            max={(seasonValues.top8?.min || 0) + 100}
          />
          <Divider sx={{ marginY: 1 }} />

          <Typography variant="h6">Premiação por Player:</Typography>
          <br />
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                    Jogador
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                    Prêmio
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rankedPlayers
                  .slice(0, getTopRanking(total).slice)
                  .map((player: any, index: number) => (
                    <TableRow key={`${player.id}-${index}`}>
                      <TableCell style={{ textAlign: 'center' }}>
                        {player.name}
                      </TableCell>
                      <TableCell style={{ textAlign: 'center' }}>
                        R$ {getPrizeValue(total, player?.place).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : (
        <Alert severity="warning" variant="outlined" icon={<WarningAmber />}>
          Não foram definidos valores para essa temporada
        </Alert>
      )}
    </>
  )
}
