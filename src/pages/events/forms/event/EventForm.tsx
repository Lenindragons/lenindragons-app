/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/require-default-props */
import { Controller, useForm } from 'react-hook-form'
import { Autocomplete, FormControl, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import DateRange from '../../../../components/commons/date-range/Daterage'
import Button from '../../../../components/commons/button/Button'
import { EventFormContainer } from './event-form-style'
import { getPokemons } from '../../../../services/poke-api/client'

type EventFormProps = {
  callback: (data: any) => void
  data?: any
}

export const EventForm = ({ callback, data }: EventFormProps) => {
  const { handleSubmit, register, control } = useForm({
    defaultValues: data,
  })

  const [options, setOptions] = useState<any[]>([])
  const [pokemon, setPokemon] = useState<any>(null)

  const onSubmit = async (formData: any): Promise<any> => {
    callback(formData)
  }

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const pokemons = await getPokemons()
        setOptions(pokemons)
      } catch (err) {
        console.error(err)
      }
    }

    fetchPokemons()
  }, [])

  const onAutoCompleteSubmit = async (value: string) => {
    try {
      const pokemons = await getPokemons()
      setOptions(pokemons)
      setPokemon(value)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <EventFormContainer onSubmit={handleSubmit(onSubmit)}>
      <FormControl fullWidth sx={{ m: 1 }} style={{ display: 'flex', gap: 20 }}>
        <div style={{ display: 'flex', flexDirection: 'row', gap: 20 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <TextField
              label="Nome da Temporada:"
              variant="outlined"
              {...register('name', { required: true })}
            />

            <Controller
              name="icon"
              control={control}
              defaultValue={pokemon}
              render={({ field: { value, ref, onBlur, onChange } }) => (
                <Autocomplete
                  value={value}
                  style={{ marginTop: 10 }}
                  options={options}
                  onBlur={onBlur}
                  ref={ref}
                  onChange={(_evt, newValue) => {
                    onChange(newValue)
                  }}
                  getOptionLabel={(option) => {
                    return option.name
                  }}
                  onInputChange={(_evt, newInputValue) => {
                    if (newInputValue) {
                      onAutoCompleteSubmit(newInputValue)
                    } else {
                      setOptions([])
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Icone da Temporada:"
                      variant="outlined"
                    />
                  )}
                />
              )}
            />

            {/* <ImageInput name="image" control={control} /> */}

            <TextField
              label="Descrição do Temporada:"
              variant="outlined"
              multiline
              {...register('description', { required: true })}
              rows={4}
              fullWidth
              style={{ marginTop: 10 }}
              required
            />
          </div>
          <DateRange
            label="Data de Inicio e Fim da Temporada:"
            name="dates"
            control={control}
          />
        </div>
        <Button>Cadastrar Temporada</Button>
      </FormControl>
    </EventFormContainer>
  )
}
