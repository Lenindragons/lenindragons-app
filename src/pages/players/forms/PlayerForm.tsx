import { useForm, Controller } from 'react-hook-form'
import { TextField, Button, Box } from '@mui/material'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../../../services/firebaseConfig'
import { UserType } from '../../../types/Player'

export const PlayerForm = ({
  callback,
  closeModal,
}: {
  callback: any
  closeModal: any
}) => {
  const { control, handleSubmit } = useForm()

  const onSubmit = async (data: any) => {
    try {
      await addDoc(collection(db, 'players'), {
        ...data,
        type: UserType.PLAYER,
      })
      callback(data)
      closeModal(true)
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
