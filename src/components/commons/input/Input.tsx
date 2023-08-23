import { InputProps } from './types'

const Input = ({ register, errors, type, name, label }: InputProps) => {
  console.log(errors)
  return (
    <div>
      <label>{label}</label>
      <input type={type} id={name} {...register(name, { required: true })} />
      {errors[name] && <span>Este campo é obrigatório</span>}
    </div>
  )
}

export default Input
