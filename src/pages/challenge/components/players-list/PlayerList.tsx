/* eslint-disable react/no-array-index-key */
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material'
import { useParams } from 'react-router-dom'
import { usePlayerItem } from '../../hooks/player-list/usePlayersList'

export const PlayerList = () => {
  const { id = '' } = useParams()
  const { playerItems } = usePlayerItem(id)
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Lugar</TableCell>
            <TableCell>Jogador</TableCell>
            <TableCell>V</TableCell>
            <TableCell>D</TableCell>
            <TableCell>E</TableCell>
            <TableCell>Deck</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {playerItems.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.place}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.wins}</TableCell>
              <TableCell>{row.looses}</TableCell>
              <TableCell>{row.ties}</TableCell>
              <TableCell>
                {row.deck.map((deck) => {
                  return (
                    <img
                      key={deck.name}
                      src={deck.url}
                      alt={deck.name}
                      title={`deck ${deck.name}`}
                      style={{ width: '50px' }}
                    />
                  )
                })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
