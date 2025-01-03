/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */
import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import {
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Button,
  Box,
  Typography,
} from '@mui/material'

// Lista de jogadores
const nomes = ['João', 'Maria', 'José', 'Pedro', 'Fulana']

type FormData = {
  jogador1: string
  jogador2: string
  resultado: string
}

interface Match {
  win: string | null
  loss: string | null
  tie: string[] | null
}

export const MatchForm = () => {
  const { control, handleSubmit, reset } = useForm<FormData>()
  const [partidas, setPartidas] = useState<Match[]>([])
  const [jogadoresDisponiveis, setJogadoresDisponiveis] =
    useState<string[]>(nomes)

  const registrarMatch = (data: FormData) => {
    const { jogador1, jogador2, resultado } = data

    // Impedir que a mesma combinação seja criada
    if (
      jogadoresDisponiveis.includes(jogador1) &&
      jogadoresDisponiveis.includes(jogador2)
    ) {
      const resultadoMatch =
        resultado === 'empate'
          ? { win: null, loss: null, tie: [jogador1, jogador2] }
          : resultado === jogador1
            ? { win: jogador1, loss: jogador2, tie: null }
            : { win: jogador2, loss: jogador1, tie: null }

      // Adicionar a partida
      setPartidas([...partidas, resultadoMatch])

      // Remover os jogadores da lista de disponíveis
      setJogadoresDisponiveis((prev) =>
        prev.filter((jogador) => jogador !== jogador1 && jogador !== jogador2)
      )
      reset() // Resetar o formulário
    }
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h6" gutterBottom>
        Registrar Partida
      </Typography>
      <form onSubmit={handleSubmit(registrarMatch)}>
        <Box sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
          {/* Select para Jogador 1 */}
          <FormControl fullWidth>
            <InputLabel id="jogador1-label">Jogador 1</InputLabel>
            <Controller
              name="jogador1"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  onChange={() => {
                    console.log('teste')
                  }}
                  label="Jogador 1"
                  id="jogador1"
                >
                  {jogadoresDisponiveis.map((nome) => (
                    <MenuItem key={nome} value={nome}>
                      {nome}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>

          {/* Select para Jogador 2 */}
          <FormControl fullWidth>
            <InputLabel id="jogador2-label">Jogador 2</InputLabel>
            <Controller
              name="jogador2"
              control={control}
              render={({ field }) => (
                <Select {...field} label="Jogador 2" id="jogador2">
                  {jogadoresDisponiveis
                    .filter((nome) => nome !== field.value)
                    .map((nome) => (
                      <MenuItem key={nome} value={nome}>
                        {nome}
                      </MenuItem>
                    ))}
                </Select>
              )}
            />
          </FormControl>
        </Box>

        {/* Select para Resultado */}
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel id="resultado-label">Resultado</InputLabel>
          <Controller
            name="resultado"
            control={control}
            render={({ field }) => (
              <Select {...field} label="Resultado" id="resultado">
                <MenuItem value="empate">Empate</MenuItem>
                <MenuItem value="Jogador 1">Jogador 1 Vencedor</MenuItem>
                <MenuItem value="Jogador 2">Jogador 2 Vencedor</MenuItem>
              </Select>
            )}
          />
        </FormControl>

        <Button variant="contained" color="primary" type="submit">
          Registrar Partida
        </Button>
      </form>

      {/* Lista de partidas registradas */}
      <Box sx={{ marginTop: 2 }}>
        <Typography variant="h6">Partidas Registradas</Typography>
        <Box sx={{ marginTop: 1 }}>
          {partidas.length > 0 ? (
            partidas.map((match, index) => (
              <Typography key={index}>
                {match.tie
                  ? `Empate entre ${match.tie.join(' e ')}`
                  : `${match.win} venceu contra ${match.loss}`}
              </Typography>
            ))
          ) : (
            <Typography>Nenhuma partida registrada.</Typography>
          )}
        </Box>
      </Box>
    </Box>
  )
}
