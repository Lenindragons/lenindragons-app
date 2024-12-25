import { useEffect, useState } from 'react'
import { Avatar, Box, Chip, Divider, Paper, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { getAllChallenges } from '@/services/challenge'

export const ReportPage = () => {
  const [challenges, setChallenges] = useState<any[]>([])
  const [filteredChallenges, setFilteredChallenges] = useState<any[]>([])

  useEffect(() => {
    const fetchChallenges = async () => {
      await getAllChallenges(setChallenges)
    }

    fetchChallenges()
  }, [])

  useEffect(() => {
    const challengesChanges = () => {
      const filtered = challenges
        .filter((challenge) => challenge.challenge)
        .filter((challenge) => ['season'].includes(challenge.season.type))

      const grouped = filtered.reduce((acc, challenge) => {
        const seasonName = challenge.season.name
          .split(' ')
          .join('-')
          .toLowerCase()

        if (!acc[seasonName]) {
          acc[seasonName] = []
        }

        acc[seasonName].push(challenge)

        return acc
      }, {}) as any

      const groupedArray = Object.keys(grouped).map((key) => {
        const totalPlayers = grouped[key]
          .map(
            (challenge: { challenge: { result: string | any[] } }) =>
              challenge.challenge.result.length
          )
          .reduce((acc: any, curr: any) => acc + curr, 0)

        const values = grouped[key]
          .map(
            (challenge: {
              challenge: { result: string | any[] }
              type: string
            }) =>
              challenge.challenge.result.length *
              (challenge.type !== 'special' ? 25 : 35)
          )
          .reduce((acc: any, curr: any) => acc + curr, 0)

        return {
          id: grouped[key][0].season.id,
          name: key.split('-').join(' '),
          image: grouped[key][0].season.image.url,
          startDate: grouped[key][0].season.dates[0].startDate,
          endDate: grouped[key][0].season.dates[0].endDate,
          challenges: grouped[key],
          totalPlayers,
          count: grouped[key].length,
          values,
          specialEvents: grouped[key].filter(
            (group: any) => group.type === 'special'
          ).length,
        }
      })

      setFilteredChallenges(groupedArray)
    }
    challengesChanges()
  }, [challenges])

  const getMediaPlayers = (challengeCount: number, totalPlayers: number) => {
    return totalPlayers / challengeCount
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  }

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" mb={2}>
        Relatório de Temporadas
      </Typography>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 15 }}>
        {filteredChallenges.map((season) => (
          <Box component={Paper} key={season.id} p={2}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: '20px',
                flexDirection: 'column',
              }}
            >
              <Avatar
                alt={season.name}
                src={season.image}
                sx={{
                  height: '150px',
                  width: '150px',
                  marginBottom: '15px',
                  background: (theme) => theme.palette.background.default,
                }}
              />
              <Typography variant="h5" sx={{ textTransform: 'capitalize' }}>
                {season.name}
              </Typography>

              <Box sx={{ display: 'flex', gap: 2, marginTop: 2 }}>
                <Chip
                  label={`Início: ${formatDate(season.startDate.toDate())}`}
                  color="primary"
                  variant="outlined"
                />
                <Chip
                  label={`Final: ${formatDate(season.endDate.toDate())}`}
                  color="secondary"
                  variant="outlined"
                />
              </Box>
            </div>

            <Box component="ul" sx={{ listStyleType: 'none', padding: 0 }}>
              <Box component="li" sx={{ marginBottom: 1 }}>
                <Typography
                  variant="body1"
                  component="span"
                  sx={{ fontWeight: 'bold' }}
                >
                  Média de Jogadores por torneio:{' '}
                </Typography>
                <Typography variant="body1" component="span">
                  {getMediaPlayers(season.count, season.totalPlayers).toFixed(
                    2
                  )}
                </Typography>
              </Box>
              <Divider sx={{ marginY: 1 }} />

              <Box component="li" sx={{ marginBottom: 1 }}>
                <Typography
                  variant="body1"
                  component="span"
                  sx={{ fontWeight: 'bold' }}
                >
                  Quantidade de Eventos especiais:{' '}
                </Typography>
                <Typography variant="body1" component="span">
                  {season.specialEvents}
                </Typography>
              </Box>
              <Divider sx={{ marginY: 1 }} />

              <Box component="li" sx={{ marginBottom: 1 }}>
                <Typography
                  variant="body1"
                  component="span"
                  sx={{ fontWeight: 'bold' }}
                >
                  Quantidade de Torneios na temporada:{' '}
                </Typography>
                <Typography variant="body1" component="span">
                  {season.count}
                </Typography>
              </Box>
              <Divider sx={{ marginY: 1 }} />
              <Box component="li" sx={{ marginBottom: 1 }}>
                <Typography
                  variant="body1"
                  component="span"
                  sx={{ fontWeight: 'bold' }}
                >
                  Valor arrecadado:{' '}
                </Typography>

                <Typography variant="body1" component="span">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(season.values)}
                </Typography>
              </Box>

              <Box component="li" sx={{ marginBottom: 1 }}>
                <Typography
                  variant="body1"
                  component="span"
                  sx={{ fontWeight: 'bold' }}
                >
                  Valor destinado para premiação:{' '}
                </Typography>

                <Typography variant="body1" component="span">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(season.totalPlayers * 5)}
                </Typography>
              </Box>

              <Box component="li" sx={{ marginBottom: 1 }}>
                <Typography
                  variant="body1"
                  component="span"
                  sx={{
                    color: (theme) => theme.palette.primary.main,
                    textUnderlineOffset: '4px',
                    fontWeight: 'bold',
                  }}
                >
                  <Link
                    to={`/analytics-report/${season.id}`}
                    style={{ color: 'inherit' }}
                  >
                    Ver mais detalhes
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Box>
        ))}
      </div>
    </Box>
  )
}
