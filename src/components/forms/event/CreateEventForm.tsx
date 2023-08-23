import { useForm } from 'react-hook-form'
import Input from '../../commons/input/Input'
import TextArea from '../../commons/textarea/TextArea'
import DateRange from '../../commons/date-range/Daterage'

const CreateEventForm = () => {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data: any): Promise<any> => {
    console.log({ data })
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

      <Input
        type="text"
        name="image"
        register={register}
        label="URL da Imagem"
        errors={errors}
      />

      <TextArea
        label="Descrição:"
        name="description"
        register={register}
        errors={errors}
      />

      <DateRange label="Data de Inicio e Fim:" name="dates" control={control} />

      <button type="submit">Cadastrar Evento</button>
    </form>
  )
}

export default CreateEventForm
