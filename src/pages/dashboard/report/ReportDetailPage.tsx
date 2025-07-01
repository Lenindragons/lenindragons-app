/* eslint-disable react/no-array-index-key */
import {
  Box,
  Grid,
  Paper,
  Table,
  TableBody,
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
import { getPlayers } from '@/services/players'

export const ReportDetailPage = () => {
  const { id } = useParams()
  const { getMappedChallengeById } = useChallenges()
  const mappedChallengeById = getMappedChallengeById(id)
  const [challenges] = useState<any>(mappedChallengeById?.challenges || [])
  const [rankedPlayers, setRankedPlayers] = useState<any>([])
  const [firebasePlayers, setFirebasePlayers] = useState<any>([])
  const [frenquency, setFrenquency] = useState<any>([])

  useEffect(() => {
    const fetchPlayers = async () => {
      const storedPlayers = await getPlayers()
      setFirebasePlayers(storedPlayers)
    }

    fetchPlayers()
  }, [])

  useEffect(() => {
    const players = mappedChallengeById?.challenges
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
    const fetchRankingPlayers = async () => {
      setRankedPlayers(await getRanking(mappedChallengeById?.challenges || [], firebasePlayers))
    }
    fetchRankingPlayers()
  }, [mappedChallengeById, firebasePlayers])

  const seasonValues = mappedChallengeById?.seasonChallengeValues || null

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
                  <TableBody>
                    {frenquency?.map((player: any, index: number) => (
                      <TableRow key={`${player.id}-${index}`}>
                        <TableCell style={{ textAlign: 'center' }}>
                          {player.count}
                        </TableCell>
                        <TableCell style={{ textAlign: 'center' }}>
                          {player.name}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item>
              <Typography variant="h5" mb={2}>
                Ranking Geral
              </Typography>
              <RankingTable rows={rankedPlayers?.slice(0, 8)} />
            </Grid>
            <Grid item>
              <Typography variant="h5" mb={2}>
                Valores e Porcentagens
              </Typography>
              <ValuesAndPercentage
                seasonValues={seasonValues || null}
                seasonResume={mappedChallengeById}
                rankedPlayers={rankedPlayers}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}
