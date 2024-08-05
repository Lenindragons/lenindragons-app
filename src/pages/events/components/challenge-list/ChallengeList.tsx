/* eslint-disable react/prop-types */
import { styled } from 'styled-components'
import { Timestamp } from 'firebase/firestore'
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
import { useChallenges } from '../../../../context/ChallengeContext'
import { Modal } from '../../../../components/commons/modal/Modal'
import { ChallengeForm } from '../../forms/event/ChallengeForm'
import { Challenge } from '../../../../types/Challenge'
import { getDate } from '../../../../helpers/format-date'

const ChallengeItem = styled.li`
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-color: greenl;
`

export const ChallengeList = ({ seasonId }: { seasonId: string }) => {
  const {
    challenges = [],
    removeChallenge,
    editChallenge,
    setSeasonId,
  } = useChallenges()

  useEffect(() => {
    setSeasonId(seasonId)
  }, [])

  const handleDelete = async (id: string) => {
    removeChallenge(id)
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
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
              <TableCell>
                <Link to={`/challenges/${challenge.id}`}>
                  <Typography variant="body1">
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
                  <Modal label="Editar Torneio">
                    <ChallengeForm
                      callback={(data) => editChallenge(challenge.id, data)}
                      data={challenge}
                    />
                  </Modal>

                  <Button
                    variant="contained"
                    color="error"
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
