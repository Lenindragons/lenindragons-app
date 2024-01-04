import {
  FieldErrors,
  FieldValues,
  RegisterOptions,
  UseFormRegisterReturn,
} from 'react-hook-form'

export type InputProps = {
  type: string
  name: string
  label: string
  register: (
    attribute: string,
    options?: RegisterOptions<FieldValues, string> | undefined
  ) => UseFormRegisterReturn<string>
  errors: FieldErrors<FieldValues>
}
