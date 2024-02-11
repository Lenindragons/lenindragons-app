/* eslint-disable react/require-default-props */
import { useForm } from 'react-hook-form'
import { FormControl, TextField } from '@mui/material'
import DateRange from '../../../../components/commons/date-range/Daterage'
import Button from '../../../../components/commons/button/Button'
import ImageInput from '../../../../components/commons/image-input/ImageInput'
import { EventFormContainer } from './event-form-style'

type EventFormProps = {
  callback: (data: any) => void
  data?: any
}

export const EventForm = ({ callback, data }: EventFormProps) => {
  const { handleSubmit, register, control } = useForm({
    defaultValues: data,
  })

  const onSubmit = async (formData: any): Promise<any> => {
    callback(formData)
  }

  return (
    <EventFormContainer onSubmit={handleSubmit(onSubmit)}>
      <FormControl fullWidth sx={{ m: 1 }}>
        <TextField
          label="Nome do Evento"
          variant="outlined"
          {...register('name', { required: true })}
        />

        <ImageInput name="image" control={control} />

        <TextField
          label="Descrição do Evento:"
          variant="outlined"
          multiline
          {...register('description', { required: true })}
          rows={4}
          fullWidth
          required
        />

        <DateRange
          label="Data de Inicio e Fim do Evento"
          name="dates"
          control={control}
        />

        <Button>Cadastrar Evento</Button>
      </FormControl>
    </EventFormContainer>
  )
}
