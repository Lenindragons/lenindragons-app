import {
  Box,
  Grid,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { RankingTable } from '@/pages/ranking/components/ranking-table'
import { getRanking } from '@/pages/ranking/components/ranking/getRanking'
import { useChallenges } from '@/context/ChallengeContext'
import { ValuesAndPercentage } from './components/ValuesAndPercentage'

export const ReportDetailPage = () => {
  const { id } = useParams()
  const { getMappedChallengeById } = useChallenges()
  const mappedChallengeById = getMappedChallengeById(id)
  const [challenges] = useState<any>(mappedChallengeById.challenges)
  const [frenquency, setFrenquency] = useState<any>([])

  useEffect(() => {
    const players = challenges
      .map((challenge: any) => challenge.challenge.result)
      .flat()
      .reduce((acc: any[], player: any) => {
        const index = acc.findIndex((p) => p.name === player.name)
        if (index === -1) {
          acc.push({ name: player.name, count: 1 })
        } else {
          acc[index].count += 1
        }
        return acc
      }, [])
      .sort(
        (
          a: { count: number; name: string },
          b: { count: number; name: string }
        ) => b.count - a.count || a.name.localeCompare(b.name)
      )

    setFrenquency(players)
  }, [challenges, getMappedChallengeById, id, mappedChallengeById.challenges])

  const seasonValues = mappedChallengeById.seasonChallengeValues

  return (
    <Box sx={{ padding: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="h4">
                Detalhes do Relatório da {challenges[0]?.season?.name || ''}
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={4} gap={0}>
            <Grid item>
              <Typography variant="h5" mb={2}>
                Frequência
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell
                        sx={{ textAlign: 'center', fontWeight: 'bold' }}
                      >
                        Em dias
                      </TableCell>
                      <TableCell
                        sx={{ textAlign: 'center', fontWeight: 'bold' }}
                      >
                        Jogador
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  {frenquency.map((player: any) => (
                    <TableRow key={player.id}>
                      <TableCell style={{ textAlign: 'center' }}>
                        {player.count}
                      </TableCell>
                      <TableCell style={{ textAlign: 'center' }}>
                        {player.name}
                      </TableCell>
                    </TableRow>
                  ))}
                </Table>
              </TableContainer>
            </Grid>
            <Grid item>
              <Typography variant="h5" mb={2}>
                Resultado
              </Typography>
              <RankingTable rows={getRanking(challenges).slice(0, 4)} />
            </Grid>
            <Grid item>
              <Typography variant="h5" mb={2}>
                Valores e Porcentagens
              </Typography>
              <ValuesAndPercentage
                seasonValues={seasonValues}
                seasonResume={mappedChallengeById}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}
