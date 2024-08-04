/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/require-default-props */
import { Controller, useForm } from 'react-hook-form'
import { Autocomplete, FormControl, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import DateRange from '../../../../components/commons/date-range/Daterage'
import Button from '../../../../components/commons/button/Button'
import { ChallengeFormContainer } from './challenge-form-style'
import { getPlayers } from '../../../../services/players'

type ChallengeFormProps = {
  callback: (data: any) => void
  data?: any
}

export const ChallengeForm = ({ callback, data }: ChallengeFormProps) => {
  const [options, setOptions] = useState<any[]>([])
  const { handleSubmit, register, control } = useForm({
    defaultValues: data,
  })

  const onSubmit = async (formData: any): Promise<any> => {
    callback(formData)
  }

  const onAutoCompleteSubmit = async () => {
    try {
      const pokemons = await getPlayers()
      setOptions(pokemons)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    // fetchPlayers()
  }, [])

  return (
    <ChallengeFormContainer onSubmit={handleSubmit(onSubmit)}>
      <FormControl fullWidth sx={{ m: 1 }} style={{ display: 'flex', gap: 5 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <TextField
              label="Nome do Torneio:"
              variant="outlined"
              {...register('name', { required: true })}
            />
          </div>

          <h2>Adicionar Participantes</h2>

          <Controller
            name="icon"
            control={control}
            defaultValue={null}
            render={({ field: { value, ref, onBlur, onChange } }) => (
              <Autocomplete
                value={value}
                style={{ marginTop: 10 }}
                options={options}
                onBlur={onBlur}
                onChange={(evt, newValue) => {
                  onChange(newValue)
                }}
                getOptionLabel={(option) => option.name}
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
                    label="Icone da Temporada:"
                    variant="outlined"
                    name="icon"
                    inputRef={ref}
                  />
                )}
              />
            )}
          />

          <DateRange label="Data do torneio:" name="dates" control={control} />
        </div>
        <Button>Cadastrar Torneio</Button>
      </FormControl>
    </ChallengeFormContainer>
  )
}
