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
import { PlayerItem, Pokemon } from '../../hooks/player-list/types'

interface OldPlayerItem {
  place: number
  name: string
  wins: number
  looses: number
  ties: number
  deck: Pokemon[]
}

const PlayerList = () => {
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
          {playerItems.map((row: OldPlayerItem | PlayerItem | any, index) => {
            const items = row.deck.icons ? row.deck.icons : row.deck
            return (
              <TableRow key={index}>
                <TableCell>{row.place}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.wins}</TableCell>
                <TableCell>{row.looses}</TableCell>
                <TableCell>{row.ties}</TableCell>
                <TableCell>
                  {items.map((icon: any) => (
                    <img
                      key={icon.name}
                      src={icon.url}
                      alt={icon.name}
                      title={`icon: ${icon.name}`}
                      style={{ width: '50px' }}
                    />
                  ))}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default PlayerList
