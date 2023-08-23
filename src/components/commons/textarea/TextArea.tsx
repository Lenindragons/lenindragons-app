import { TextAreaProps } from './types'

const TextArea = ({ label, name, register, errors }: TextAreaProps) => {
  return (
    <div>
      <label>{label}</label>
      <textarea id={name} {...register(name, { required: true })} />
      {errors.descricao && <span>Este campo é obrigatório</span>}
    </div>
  )
}

export default TextArea
