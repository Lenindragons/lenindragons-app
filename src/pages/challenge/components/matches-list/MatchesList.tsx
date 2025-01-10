/* eslint-disable react/no-array-index-key */
import {
  Alert,
  Paper,
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
import { TabPanel } from '@/components/tab-panel'

const MatchesList = ({ matches }: any) => {
  const rodadas: any[][] = []

  matches.forEach((match: any) => {
    if (!rodadas[match.round]) {
      rodadas[match.round] = []
    }

    rodadas[match.round].push(match)
  })

  const [value, setValue] = useState(0)

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="secondary"
        textColor="inherit"
        aria-label="Tabela de rodadas"
        sx={{ width: '100%', mt: 2 }}
      >
        {rodadas.map((_, index) => (
          <Tab key={index} label={`Rodada ${index}`} />
        ))}
      </Tabs>

      {rodadas.map((rodada, index) => (
        <TabPanel
          value={value}
          index={index - 1}
          key={index}
          style={{ width: '100%' }}
        >
          <TableContainer key={index} component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Jogador 1</TableCell>
                  <TableCell>Jogador 2</TableCell>
                  <TableCell>Resultado</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rodada.map((match: any, index2: number) => (
                  <TableRow key={index2}>
                    <TableCell key={index2}>
                      {match?.players[0]?.name ? (
                        match?.players[0]?.name
                      ) : (
                        <Alert icon={false} severity="info" variant="filled">
                          Bye
                        </Alert>
                      )}
                    </TableCell>
                    <TableCell key={index2}>
                      {match?.players[1]?.name ? (
                        match?.players[1]?.name
                      ) : (
                        <Alert icon={false} severity="info" variant="filled">
                          Bye
                        </Alert>
                      )}
                    </TableCell>
                    <TableCell key={index2}>
                      {match?.result?.name ? (
                        <Alert icon={false} severity="success" variant="filled">
                          {match?.result?.name}
                        </Alert>
                      ) : (
                        <Alert icon={false} severity="warning" variant="filled">
                          Empate
                        </Alert>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
      ))}
    </>
  )
}

export default MatchesList
