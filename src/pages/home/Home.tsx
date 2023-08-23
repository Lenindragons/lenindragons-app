/* eslint-disable jsx-a11y/label-has-associated-control */
import styled, { useTheme } from 'styled-components'
import {
  useForm,
  Controller,
  UseFormRegisterReturn,
  RegisterOptions,
  FieldValues,
  FieldErrors,
} from 'react-hook-form'
import { DateRange } from 'react-date-range'
import { useAuth } from '../../context/AuthContext'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

const Header = styled.header`
  display: flex;
  padding: 10px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 5px solid;
  button {
    padding: 10px;
    font-size: 15px;
  }
`

const Box = styled.section`
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 16px;
  margin: 16px;

  h2 {
    font-size: 18px;
    margin-bottom: 8px;
  }

  div {
    font-size: 14px;
    color: #333;
  }

  /* Estilos para o formulário */
  form {
    display: grid;
    grid-template-columns: 1fr 1fr; /* Divide o formulário em duas colunas */
    gap: 20px; /* Espaço entre os elementos */

    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f2f2f2;
    border-radius: 8px;
  }

  /* Estilos para os campos de entrada */
  input[type='text'],
  textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
  }

  /* Estilos para os rótulos */
  label {
    font-weight: bold;
  }

  /* Estilos para o seletor de datas */
  .react-date-range {
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 10px;
  }

  /* Estilos para o botão de envio */
  button[type='submit'] {
    grid-column: span 2; /* Ocupa duas colunas */
    background-color: ${(props) => props.theme.colors.primary};
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 10px 20px;
    font-size: 18px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  button[type='submit']:hover {
    background-color: ${(props) => props.theme.colors.primary};
  }
`

type InputProps = {
  type: string
  name: string
  label: string
  register: (
    attribute: string,
    options?: RegisterOptions<FieldValues, string> | undefined
  ) => UseFormRegisterReturn<string>
  errors: FieldErrors<FieldValues>
}

const Input = ({ register, errors, type, name, label }: InputProps) => {
  return (
    <div>
      <label>{label}</label>
      <input type={type} id={name} {...register(name, { required: true })} />
      {errors.nome && <span>Este campo é obrigatório</span>}
    </div>
  )
}

export const Home = () => {
  const { logout, user } = useAuth()
  const theme = useTheme()
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
    <>
      <Header>
        <h1>Seja bem vinda, {user.name}</h1>
        <button type="button" onClick={logout}>
          Deslogar
        </button>
      </Header>
      <Box>
        <h2>Criar Evento</h2>

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

          <div>
            <label>Descrição:</label>
            <textarea
              id="descricao"
              {...register('descricao', { required: true })}
            />
            {errors.descricao && <span>Este campo é obrigatório</span>}
          </div>

          <div>
            <label>Data de Início e Término:</label>
            <Controller
              name="dates"
              control={control}
              defaultValue={[
                { startDate: new Date(), endDate: null, key: 'selection' },
              ]}
              render={({ field }) => (
                <DateRange
                  onChange={(item) => field.onChange([item.selection])}
                  moveRangeOnFirstSelection={false}
                  rangeColors={[theme.colors.primary]}
                  ranges={field.value}
                />
              )}
            />
          </div>
          <button type="submit">Cadastrar Evento</button>
        </form>
      </Box>
    </>
  )
}
