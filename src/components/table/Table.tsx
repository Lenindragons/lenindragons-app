/* eslint-disable react/prop-types */
import {
  Button,
  Chip,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Table as TableUi,
  Typography,
} from '@mui/material'
import { deletePlayer } from '../../services/players'
import { UserType } from '../../types/Player'

export const Table = ({
  rows,
  setPlayers,
}: {
  rows: any
  setPlayers: React.Dispatch<React.SetStateAction<any[]>>
}) => {
  const removePlayer = (id: string) => {
    const confirmed = window.confirm(
      'Você tem certeza que quer deletar esse jogador?'
    )
    if (confirmed) {
      deletePlayer(id)
      setPlayers((prev: any) => prev.filter((player: any) => player.id !== id))
    }
  }

  return (
    <TableContainer component={Paper}>
      <TableUi>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Tipo</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((player: any) => (
            <TableRow key={player.id}>
              <TableCell>
                <Typography variant="body2">{player.name}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2">{player.email}</Typography>
              </TableCell>
              <TableCell>
                <Chip
                  label={`${player.type}`}
                  color={player.type === UserType.ADMIN ? 'error' : 'primary'}
                  variant="outlined"
                />
              </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => removePlayer(player.id)}
                >
                  Remover
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TableUi>
    </TableContainer>
  )
}
