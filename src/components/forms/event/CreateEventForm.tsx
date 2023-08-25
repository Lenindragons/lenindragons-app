import { useForm } from 'react-hook-form'
import Input from '../../commons/input/Input'
import TextArea from '../../commons/textarea/TextArea'
import DateRange from '../../commons/date-range/Daterage'
import Button from '../../commons/button/Button'
import { createEvent } from '../../../services/events'
import ImageInput from '../../commons/image-input/ImageInput'

const CreateEventForm = () => {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data: any): Promise<any> => {
    createEvent(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        type="text"
        name="name"
        register={register}
        label="Nome do Evento"
        errors={errors}
      />

      <ImageInput name="image" control={control} />

      <TextArea
        label="Descrição:"
        name="description"
        register={register}
        errors={errors}
      />

      <DateRange label="Data de Inicio e Fim:" name="dates" control={control} />

      <Button>Cadastrar Evento</Button>
    </form>
  )
}

export default CreateEventForm
