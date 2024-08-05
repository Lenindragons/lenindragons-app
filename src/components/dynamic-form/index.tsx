/* eslint-disable @typescript-eslint/no-shadow */
import { useForm, useFieldArray, Controller } from 'react-hook-form'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Box,
  Autocomplete,
} from '@mui/material'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { getPlayers } from '../../services/players'
import { useChallenges } from '../../context/ChallengeContext'

type FormValues = {
  players: {
    place: number
    player: string
    wins: number
    looses: number
    ties: number
  }[]
}

const DynamicForm = () => {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      players: [{ place: 0, player: '', wins: 0, looses: 0, ties: 0 }],
    },
  })

  const [options, setOptions] = useState<any[]>([])
  const { editChallenge } = useChallenges()

  const onAutoCompleteSubmit = async () => {
    try {
      const pokemons = await getPlayers()
      setOptions(pokemons)
    } catch (err) {
      console.error(err)
    }
  }

  const { fields, append } = useFieldArray({
    control,
    name: 'players',
  })

  const { id = '' } = useParams()

  const onSubmit = (data: FormValues) => {
    editChallenge(id, data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Lugar</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Vitórias</TableCell>
              <TableCell>Derrotas</TableCell>
              <TableCell>Empates</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fields.map((field, index) => (
              <TableRow key={field.id}>
                <TableCell>
                  <Controller
                    name={`players.${index}.place`}
                    control={control}
                    disabled
                    render={({ field }) => (
                      <TextField
                        style={{ width: '60px', textAlign: 'center' }}
                        type="number"
                        {...field}
                        value={index + 1}
                      />
                    )}
                  />
                </TableCell>
                <TableCell>
                  <Controller
                    name={`players.${index}.player`}
                    control={control}
                    render={({ field: { value, ref, onBlur, onChange } }) => (
                      <Autocomplete
                        style={{ minWidth: 300 }}
                        options={options}
                        onBlur={onBlur}
                        onChange={(evt, newValue) => {
                          onChange(newValue)
                        }}
                        getOptionLabel={(option) => option.name || value}
                        onInputChange={(evt, newInputValue) => {
                          if (newInputValue) {
                            onAutoCompleteSubmit()
                          } else {
                            setOptions([])
                          }
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Nome jogador:"
                            variant="outlined"
                            style={{ display: 'block' }}
                            inputRef={ref}
                          />
                        )}
                      />
                    )}
                  />
                </TableCell>
                <TableCell>
                  <Controller
                    name={`players.${index}.wins`}
                    control={control}
                    render={({ field }) => (
                      <TextField type="number" {...field} />
                    )}
                  />
                </TableCell>
                <TableCell>
                  <Controller
                    name={`players.${index}.looses`}
                    control={control}
                    render={({ field }) => (
                      <TextField type="number" {...field} />
                    )}
                  />
                </TableCell>
                <TableCell>
                  <Controller
                    name={`players.${index}.ties`}
                    control={control}
                    render={({ field }) => (
                      <TextField type="number" {...field} />
                    )}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ marginTop: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() =>
            append({ place: 0, player: '', wins: 0, looses: 0, ties: 0 })
          }
        >
          Adicionar Jogador aos resultados
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          sx={{ marginLeft: 2 }}
        >
          Salvar
        </Button>
      </Box>
    </form>
  )
}

export default DynamicForm
