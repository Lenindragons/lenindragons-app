/* eslint-disable react/no-array-index-key */
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Collapse,
  Box,
} from '@mui/material'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { ExpandLess, ExpandMore } from '@mui/icons-material'
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
  const [expandedRows, setExpandedRows] = useState<number[]>([])

  const handleRowClick = (index: number) => {
    setExpandedRows((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    )
  }

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
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {playerItems.map((row: OldPlayerItem | PlayerItem | any, index) => {
            const items = row.deck.icons ? row.deck.icons : row.deck
            const isExpanded = expandedRows.includes(index)
            return (
              <>
                <TableRow key={index} onClick={() => handleRowClick(index)}>
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
                  <TableCell>
                    <IconButton>
                      {isExpanded ? <ExpandLess /> : <ExpandMore />}
                    </IconButton>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={7}
                  >
                    <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                      <Box margin={1}>
                        {/* Conteúdo adicional para a linha expandida */}
                        <div>Detalhes adicionais do jogador {row.name}</div>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default PlayerList
