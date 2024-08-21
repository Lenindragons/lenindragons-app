import { Autocomplete, TextField } from '@mui/material'
import { Controller } from 'react-hook-form'
import { useState } from 'react'
import { getPokemons } from '../../../services/poke-api/client'
import { PokemonIcon } from '../../../services/decks/useDeckStore'

export const PokemonSelect = ({
  control,
  name,
  defaultValue = [],
}: {
  name: string
  control: any
  defaultValue: any | PokemonIcon[]
}) => {
  const [options, setOptions] = useState<any>([])
  const [selectedPokemon, setSelectedPokemon] = useState<any>(null)

  const onAutoCompleteSubmit = async (value: string) => {
    try {
      const pokemons = await getPokemons()
      setOptions(pokemons)
      setSelectedPokemon(value)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={selectedPokemon}
      render={({ field: { ref, onBlur, onChange } }) => (
        <Autocomplete
          multiple
          style={{ marginTop: 10 }}
          defaultValue={defaultValue}
          options={options}
          isOptionEqualToValue={(option, values: any) => {
            return option.name === values.name
          }}
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
              fullWidth
            />
          )}
        />
      )}
    />
  )
}
