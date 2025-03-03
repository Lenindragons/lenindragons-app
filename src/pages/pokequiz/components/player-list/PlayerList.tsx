import { useEffect, useState } from 'react'
import {
  Typography,
  Box,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from '@mui/material'

type Player = {
  name: string
  points: number
}

type PlayerListProps = {
  players: string[]
  getNextPlayer: (currentPlayer: string) => string // Função para mudar o jogador ativo
  addPoints: (player: string) => void // Função para adicionar pontos ao jogador ativo
}

export const PlayerList = ({ players, getNextPlayer, addPoints }: PlayerListProps) => {
  // Inicializa a lista de jogadores com 0 pontos e ordena alfabeticamente
  const [playerList, setPlayerList] = useState<Player[]>(
    players.sort((a, b) => a.localeCompare(b)).map(name => ({ name, points: 0 }))
  )
  const [activePlayer, setActivePlayer] = useState<string>(playerList[0]?.name || '')

  useEffect(() => {
    // Atualiza o jogador ativo quando a ação externa indicar uma mudança
    setActivePlayer(prevPlayer => getNextPlayer(prevPlayer))
  }, [getNextPlayer])

  useEffect(() => {
    // Atualiza os pontos do jogador ativo quando a ação externa indicar
    setPlayerList(prevList =>
      prevList.map(player =>
        player.name === activePlayer ? { ...player, points: player.points + 1 } : player
      )
    )
  }, [addPoints, activePlayer])

  return (
    <Box>
      <Typography variant="h6" gutterBottom align="center" color="primary">
        Lista de Jogadores
      </Typography>
      <div style={{ overflow: 'auto', height: '200px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: '20%' }}>Pontos</TableCell>
              <TableCell>Jogador</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {playerList.map(player => (
              <TableRow key={player.name} selected={player.name === activePlayer}>
                <TableCell>
                  <Typography variant="body1">{player.points}</Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="body1"
                    color={player.name === activePlayer ? "secondary" : "inherit"}
                  >
                    {player.name}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Box>
  )
}
