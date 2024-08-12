/* eslint-disable no-restricted-globals */
/* eslint-disable react/prop-types */
import { TextField } from '@mui/material'
import { Controller } from 'react-hook-form'

export const InputNumber = ({
  control,
  index,
  clearErrors,
  hasError,
  hasFinished,
  inputName = '',
  fieldName,
}: {
  control: any
  index: number
  clearErrors: unknown | any | ((inputName: string) => void)
  hasError: (index: number, field: string) => boolean
  hasFinished: boolean
  inputName: string | undefined
  fieldName: string | undefined
}) => {
  return (
    <Controller
      rules={{ required: true }}
      name={inputName || ''}
      control={control}
      render={({ field }) => (
        <TextField
          style={{ width: '60px', textAlign: 'center' }}
          type="number"
          required
          disabled={hasFinished}
          {...field}
          onChange={(e) => {
            field.onChange(e)
            clearErrors(inputName)
          }}
          error={hasError(index, fieldName || '')}
        />
      )}
    />
  )
}
