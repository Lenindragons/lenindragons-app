/* eslint-disable no-alert */
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
import { useAuth } from '@/context/AuthContext'

export const Table = ({
  rows,
  setPlayers,
}: {
  rows: {
    id: string
    name: string
    email: string
    type: 'admin' | 'player' | 'judge' | 'organizer'
  }[]
  setPlayers: React.Dispatch<React.SetStateAction<any[]>>
}) => {
  const { user } = useAuth()
  const removePlayer = (id: string) => {
    const confirmed = window.confirm(
      'Você tem certeza que quer deletar esse jogador?'
    )
    if (confirmed) {
      deletePlayer(id)
      setPlayers((prev: any) => prev.filter((player: any) => player.id !== id))
    }
  }

  const color: {
    [key in 'admin' | 'player' | 'judge' | 'organizer']:
      | 'warning'
      | 'primary'
      | 'secondary'
      | 'success'
  } = {
    admin: 'warning',
    player: 'primary',
    judge: 'secondary',
    organizer: 'success',
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
          {rows.map(
            (player: {
              id: string
              name: string
              email: string
              type: 'admin' | 'player' | 'judge' | 'organizer'
            }) => (
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
                    color={color[player.type]}
                    variant={player.type !== 'player' ? 'filled' : 'outlined'}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    disabled={user.type !== 'admin'}
                    color="error"
                    onClick={() => removePlayer(player.id)}
                  >
                    Excluir
                  </Button>
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </TableUi>
    </TableContainer>
  )
}
