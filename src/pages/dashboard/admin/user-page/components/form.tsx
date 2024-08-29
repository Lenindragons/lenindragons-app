/* eslint-disable react/prop-types */
import { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { TextField, Button, FormControl } from '@mui/material'

interface User {
  uid: string
  name: string
  email: string
  image: string
  type: string
}

interface UserFormProps {
  onSubmit: (data: User) => void
  defaultValues: User
}

function UserForm({ onSubmit, defaultValues }: UserFormProps) {
  const { handleSubmit, control, reset } = useForm({
    defaultValues,
  })

  useEffect(() => {
    reset(defaultValues)
  }, [defaultValues, reset])

  return (
    <FormControl
      sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        name="name"
        control={control}
        render={({ field }) => <TextField {...field} label="Name" />}
      />
      <Controller
        name="email"
        control={control}
        render={({ field }) => <TextField {...field} label="Email" />}
      />
      <Controller
        name="image"
        control={control}
        render={({ field }) => <TextField {...field} label="Image URL" />}
      />
      <Controller
        name="type"
        control={control}
        render={({ field }) => <TextField {...field} label="Type" />}
      />
      <Button type="submit" variant="contained">
        Submit
      </Button>
    </FormControl>
  )
}

export default UserForm
