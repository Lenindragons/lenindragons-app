/* eslint-disable consistent-return */
/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-shadow */
import { useForm, useFieldArray, Controller } from 'react-hook-form'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  TextField,
  Button,
  Box,
  Autocomplete,
  Grid,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { getPlayers } from '../../services/players'
import { useChallenges } from '../../context/ChallengeContext'
import { usePlayerItem } from '../../pages/challenge/hooks/player-list/usePlayersList'
import { getPokemons } from '../../services/poke-api/client'
import Dialog from '../commons/dialog/Dialog'
import { mappingPlayers, validateFields } from './utils'
import { FormValues } from './types'
import DynamicTitle from './components/title/DynamicTitle'
import DynamicTableHead from './components/table-header/DynamicTableHead'
import { InputNumber } from './components/input-number/InputNumber'
import { toastError, toastSuccess } from '../commons/toast-error/ToastError'
import { NotificationMessages } from './constants'

const DynamicForm = () => {
  const { id = '' } = useParams()

  const [pokemonOptions, setPokemonOptions] = useState<any[]>([])
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true)
  const [options, setOptions] = useState<any[]>([])
  const [, setPokemon] = useState<any>(null)

  const { addPlayerItem, setHasFinished, hasFinished, setId } =
    usePlayerItem(id)
  const { editChallenge } = useChallenges()

  const {
    control,
    handleSubmit,
    getValues,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      players: [
        {
          place: 0,
          player: { name: '' },
          wins: 0,
          looses: 0,
          ties: 0,
          deck: [],
        },
      ],
    },
  })
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'players',
  })

  useEffect(() => {
    setId(id)
    const fetchPokemons = async () => {
      try {
        const pokemons = await getPokemons()
        setPokemonOptions(pokemons)
      } catch (err) {
        console.error(err)
      }
    }
    fetchPokemons()
  }, [])

  const onAutoCompletePokemonSubmit = async (value: string) => {
    try {
      setPokemon(value)
    } catch (err) {
      console.error(err)
    }
  }

  const onAutoCompleteSubmit = async () => {
    try {
      const players = await getPlayers()
      setOptions(players)
    } catch (err) {
      console.error(err)
    }
  }

  const onSubmit = (data: FormValues) => {
    editChallenge(id, data)
  }

  const hasError = (index: number, field: string) => {
    return !!errors.players?.[index]?.[field]
  }

  return (
    <>
      <DynamicTitle />
      <form onSubmit={handleSubmit(onSubmit)}>
        <TableContainer component={Paper}>
          <Table>
            <DynamicTableHead />
            <TableBody>
              {fields.map((field, index) => (
                <TableRow key={field.id}>
                  <TableCell>
                    <InputNumber
                      control={control}
                      index={index}
                      clearErrors={clearErrors}
                      hasError={hasError}
                      hasFinished={hasFinished}
                      inputName={`players.${index}.place`}
                      fieldName="place"
                    />
                  </TableCell>
                  <TableCell>
                    <Controller
                      rules={{ required: true }}
                      name={`players.${index}.player`}
                      control={control}
                      render={({ field: { value, ref, onBlur, onChange } }) => (
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <Autocomplete
                              fullWidth
                              options={options}
                              onBlur={onBlur}
                              disabled={hasFinished}
                              isOptionEqualToValue={(option, value) => {
                                return option.id === value.id
                              }}
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
                                clearErrors(`players.${index}.player`)
                              }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Nome jogador:"
                                  variant="outlined"
                                  style={{ minWidth: '200px' }}
                                  inputRef={ref}
                                  fullWidth
                                  error={hasError(index, 'player')}
                                />
                              )}
                            />
                          </Grid>
                        </Grid>
                      )}
                    />
                  </TableCell>
                  <TableCell>
                    <InputNumber
                      control={control}
                      index={index}
                      clearErrors={clearErrors}
                      hasError={hasError}
                      hasFinished={hasFinished}
                      inputName={`players.${index}.wins`}
                      fieldName="wins"
                    />
                  </TableCell>
                  <TableCell>
                    <InputNumber
                      control={control}
                      index={index}
                      clearErrors={clearErrors}
                      hasError={hasError}
                      hasFinished={hasFinished}
                      inputName={`players.${index}.looses`}
                      fieldName="looses"
                    />
                  </TableCell>
                  <TableCell>
                    <InputNumber
                      control={control}
                      index={index}
                      clearErrors={clearErrors}
                      hasError={hasError}
                      hasFinished={hasFinished}
                      inputName={`players.${index}.ties`}
                      fieldName="ties"
                    />
                  </TableCell>
                  <TableCell>
                    <Controller
                      name={`players.${index}.deck`}
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, ref, onBlur, onChange } }) => (
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <Autocomplete
                              fullWidth
                              multiple
                              options={pokemonOptions}
                              onBlur={onBlur}
                              disabled={hasFinished}
                              isOptionEqualToValue={(option, value) => {
                                return option.name === value.name
                              }}
                              onChange={(evt, newValue) => {
                                onChange(newValue)
                              }}
                              getOptionLabel={(option) => option.name || value}
                              onInputChange={(evt, newInputValue) => {
                                if (newInputValue) {
                                  onAutoCompletePokemonSubmit(newInputValue)
                                } else {
                                  setOptions([])
                                }
                                clearErrors(`players.${index}.deck`)
                              }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Pokemons:"
                                  variant="outlined"
                                  style={{ minWidth: '200px' }}
                                  inputRef={ref}
                                  fullWidth
                                  error={hasError(index, 'deck')}
                                />
                              )}
                            />
                          </Grid>
                        </Grid>
                      )}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => remove(index)}
                      variant="contained"
                      disabled={hasFinished}
                      color="error"
                    >
                      Remover
                    </Button>
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
            disabled={hasFinished}
            onClick={() => {
              const { players } = getValues()
              const mappedPlayers = mappingPlayers(players)
              if (!validateFields(mappedPlayers, setError)) {
                setButtonDisabled(true)
                toastError(NotificationMessages.ERROR_FILL)
                return
              }

              addPlayerItem(mappedPlayers)
              setButtonDisabled(false)

              append({
                place: 0,
                player: { email: '', name: '', id: '' },
                wins: 0,
                looses: 0,
                ties: 0,
                deck: [],
              })
            }}
          >
            Adicionar Jogador aos resultados
          </Button>
          <Button
            type="button"
            variant="contained"
            color="secondary"
            sx={{ marginLeft: 2 }}
            disabled={buttonDisabled}
            onClick={() => {
              if (
                !validateFields(mappingPlayers(getValues().players), setError)
              ) {
                setButtonDisabled(true)
                toastError(NotificationMessages.ERROR_FILL)
                return null
              }
              toast(
                <Dialog
                  onClose={() => toast.dismiss()}
                  onConfirm={() => {
                    setHasFinished(true, id)
                    setButtonDisabled(true)
                    toast.dismiss()
                    toastSuccess(NotificationMessages.SUCCESS)
                  }}
                />
              )
            }}
          >
            Confirmar resultados
          </Button>
        </Box>
      </form>
      <ToastContainer />
    </>
  )
}

export default DynamicForm
