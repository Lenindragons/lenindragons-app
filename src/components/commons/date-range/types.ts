import { Control, FieldValues } from 'react-hook-form'

export type DatePickerProps = {
  label: string
  name: string
  control: Control<FieldValues, any>
}
