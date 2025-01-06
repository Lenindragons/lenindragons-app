/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Button,
} from '@mui/material'
import { useEffect } from 'react'
import { useChallenges } from '@/context/ChallengeContext'
import { Modal } from '@/components/commons/modal/Modal'
import { ChallengeForm } from '../../forms/event/ChallengeForm'
import { getDate } from '@/helpers/format-date'
import { useAuth } from '@/context/AuthContext'

export const ChallengeList = ({ seasonId, challengeType }: { seasonId: string, challengeType: string }) => {
  const { user } = useAuth()
  const {
    challenges = [],
    removeChallenge,
    editChallenge,
    setSeasonId,
  } = useChallenges()

  useEffect(() => {
    setSeasonId(seasonId)
  }, [seasonId, setSeasonId])

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      'Você tem certeza que quer deletar esse torneio?'
    )
    if (confirmed) {
      removeChallenge(id)
    }
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {challengeType === 'others' && <TableCell>Nome</TableCell>}
            <TableCell>Data</TableCell>
            <TableCell>Rodadas</TableCell>
            <TableCell>Tempo da Rodada</TableCell>
            <TableCell>Temporada</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {challenges.map((challenge: any) => (
            <TableRow key={challenge.id}>
              {challengeType === 'others' && (
                <TableCell>
                  <Link
                    to={`/challenges/${challenge.id}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <Typography variant="body2">{challenge.name}</Typography>
                  </Link>
                </TableCell>
              )}
              <TableCell>
                <Link
                  to={`/challenges/${challenge.id}`}
                  style={{ textDecoration: 'none' }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      color: (theme) => theme.palette.text.primary,
                      textDecoration: 'underline',
                      textUnderlineOffset: '4px',
                    }}
                  >
                    {getDate(challenge.dates[0].startDate)}
                  </Typography>
                </Link>
              </TableCell>
              <TableCell>
                <Typography variant="body2">{challenge.rounds}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2">{challenge.roundTime}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2">{challenge.season.name}</Typography>
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  {['admin', 'judge'].includes(user.type) && (
                    <Modal label="Editar Torneio">
                      <ChallengeForm
                        callback={(data) => editChallenge(challenge.id, data)}
                        data={challenge}
                      />
                    </Modal>
                  )}
                  <Button
                    variant="contained"
                    color="error"
                    disabled={!['admin', 'judge'].includes(user.type)}
                    onClick={() => handleDelete(challenge.id)}
                  >
                    Excluir
                  </Button>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ChallengeList
