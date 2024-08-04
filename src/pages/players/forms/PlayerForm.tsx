import { useForm, Controller } from 'react-hook-form'
import { TextField, Button, Box } from '@mui/material'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../../../services/firebaseConfig'

export const PlayerForm = ({ callback, closeModal }) => {
  const { control, handleSubmit, reset } = useForm()

  const onSubmit = async (data: any) => {
    try {
      await addDoc(collection(db, 'players'), data)
      callback(data)
      closeModal(true)
      console.log('Player added successfully!')
    } catch (error) {
      console.error('Error adding player: ', error)
    }
  }
  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 0 }}>
      <Controller
        name="name"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="Nome:"
            variant="outlined"
            fullWidth
            margin="normal"
          />
        )}
      />
      <Controller
        name="email"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="Email:"
            variant="outlined"
            fullWidth
            margin="normal"
          />
        )}
      />
      <Button type="submit" variant="contained" color="primary">
        Adicionar jogador
      </Button>
    </Box>
  )
}
