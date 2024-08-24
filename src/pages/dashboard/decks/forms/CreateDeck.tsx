import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import {
  TextField,
  Button,
  DialogContent,
  FormControl,
  DialogTitle,
  DialogActions,
} from '@mui/material'
import useDeckStore, { PokemonIcon } from '@/services/decks/useDeckStore'
import { PokemonSelect } from '@/components/commons/pokemon-select/PokemonSelect'

interface FormValues {
  name: string
  icons: PokemonIcon[]
}

export const CreateDeck: React.FC = () => {
  const { createDeck } = useDeckStore()
  const { control, handleSubmit, reset } = useForm<FormValues>()

  const onSubmit = async (data: FormValues) => {
    await createDeck(data.name, data.icons)
    reset()
  }

  return (
    <FormControl component="form" onSubmit={handleSubmit(onSubmit)}>
      <DialogTitle>Criar novo Deck</DialogTitle>
      <DialogContent>
        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Nome do Deck"
              variant="outlined"
              fullWidth
              margin="normal"
              style={{ minWidth: 350 }}
            />
          )}
        />
        <PokemonSelect name="icons" control={control} defaultValue={[]} />
      </DialogContent>
      <DialogActions>
        <Button type="submit" variant="contained" color="primary">
          Adicionar Deck
        </Button>
      </DialogActions>
    </FormControl>
  )
}
