/* eslint-disable no-plusplus */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/jsx-key */
/* eslint-disable react/no-array-index-key */

import {
  Box,
  Button,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Paper,
  Radio,
  Select,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
} from '@mui/material'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { updateChallenge } from '@/services/challenge'
import { TabPanel } from '@/components/tab-panel'

const createArray = (length: number) => Array.from({ length })

const TableMatches = ({
  key,
  matches,
  players,
  round,
  selectedValues,
  setSelectedValues,
}: any) => {
  const handleOptionsSelect = (event: any) => {
    setSelectedValues({
      ...selectedValues,
      [event.target.name]: event.target.value,
    })
  }

  return (
    <TableContainer key={key}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Jogador 1</TableCell>
            <TableCell>Jogador 2</TableCell>
            <TableCell>Empate</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {matches.map((_: any, index: number) => (
            <TableRow key={index}>
              <TableCell>
                <FormGroup
                  sx={{
                    display: 'flex',
                    gap: 2,
                    flexGrow: 1,
                    flexShrink: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Select
                    sx={{ flexGrow: 1 }}
                    name={`match_player1_${round}_${index}`}
                    value={selectedValues[`match_player1_${round}_${index}`]}
                    onChange={handleOptionsSelect}
                  >
                    {players.map((player: any, index: number) => (
                      <MenuItem key={index} value={player}>
                        {player.name}
                      </MenuItem>
                    ))}
                    <MenuItem value="bye">Bye</MenuItem>
                  </Select>
                  <FormControlLabel
                    value="Vencedor"
                    control={
                      <Radio
                        checked={
                          selectedValues[
                            `result_match_player_${round}_${index}`
                          ] === `match_player1_${round}_${index}`
                        }
                        onChange={handleOptionsSelect}
                        value={`match_player1_${round}_${index}`}
                        name={`result_match_player_${round}_${index}`}
                      />
                    }
                    label="Vencedor"
                  />
                </FormGroup>
              </TableCell>
              <TableCell>
                <FormGroup
                  sx={{
                    display: 'flex',
                    gap: 2,
                    flexGrow: 1,
                    flexShrink: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Select
                    sx={{ flexGrow: 1 }}
                    name={`match_player2_${round}_${index}`}
                    value={selectedValues[`match_player2_${round}_${index}`]}
                    onChange={handleOptionsSelect}
                  >
                    {players.map((player: any, index: number) => (
                      <MenuItem key={index} value={player}>
                        {player.name}
                      </MenuItem>
                    ))}
                    <MenuItem value="bye">Bye</MenuItem>
                  </Select>

                  <FormControlLabel
                    value="Vencedor"
                    control={
                      <Radio
                        checked={
                          selectedValues[
                            `result_match_player_${round}_${index}`
                          ] === `match_player2_${round}_${index}`
                        }
                        onChange={handleOptionsSelect}
                        value={`match_player2_${round}_${index}`}
                        name={`result_match_player_${round}_${index}`}
                      />
                    }
                    label="Vencedor"
                  />
                </FormGroup>
              </TableCell>
              <TableCell>
                <FormControlLabel
                  value="Empate"
                  control={
                    <Radio
                      checked={
                        selectedValues[
                          `result_match_player_${round}_${index}`
                        ] === `match_tie_${round}_${index}`
                      }
                      onChange={handleOptionsSelect}
                      value={`match_tie_${round}_${index}`}
                      name={`result_match_player_${round}_${index}`}
                    />
                  }
                  label="Empate"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

const getNumberOfMatches = (numberOfPlayers: number) => {
  return numberOfPlayers % 2 === 0
    ? numberOfPlayers / 2
    : (numberOfPlayers + 1) / 2
}

export const MatchesPage = ({ players }: any) => {
  const { id } = useParams<{ id: string }>()
  const numberOfRounds = 3
  const rounds = createArray(numberOfRounds).map(
    (_, index) => `Round ${index + 1}`
  )
  const matches = createArray(getNumberOfMatches(players.length))

  const [value, setValue] = useState(0)
  const [selectedValues, setSelectedValues] = useState<any>({})

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const organizeData = (data: any, rounds: number, tables: number) => {
    const result = []

    for (let round = 1; round <= rounds; round++) {
      for (let table = 1; table <= tables; table++) {
        const matchPlayer1 = data[`match_player1_round${round}_${table - 1}`]
        const matchPlayer2 = data[`match_player2_round${round}_${table - 1}`]

        const resultMatchPlayer =
          data[`result_match_player_round${round}_${table - 1}`]

        const player1 = matchPlayer1 || { name: 'bye' }
        const player2 = matchPlayer2 || { name: 'bye' }

        const resultMatch =
          resultMatchPlayer === `match_tie_round${round}_${table - 1}`
            ? 'tie'
            : player1

        result.push({
          round,
          table,
          result: resultMatch,
          players: [player1, player2],
        })
      }
    }

    return result
  }

  const sendMatches = () => {
    const matchData = organizeData(selectedValues, 3, 3)
    updateChallenge(id || '', { matches: matchData })
  }

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="secondary"
        textColor="inherit"
        aria-label="basic tabs example"
      >
        {rounds.map((round) => (
          <Tab
            key={round.toLowerCase().replace(/\s/g, '')}
            label={round.replace('Round', 'Rodada')}
          />
        ))}
      </Tabs>
      {rounds.map((round, index) => (
        <TabPanel value={value} index={index} key={index}>
          <Paper>
            <TableMatches
              key={index}
              matches={matches}
              players={players}
              setSelectedValues={setSelectedValues}
              selectedValues={selectedValues}
              round={round.toLowerCase().replace(/\s/g, '')}
            />
          </Paper>
          <br />
          <Button variant="contained" color="primary" onClick={sendMatches}>
            Salvar resultados das rodadas
          </Button>
        </TabPanel>
      ))}
    </Box>
  )
}
