/* eslint-disable no-restricted-globals */
/* eslint-disable react/prop-types */
import { TextField } from '@mui/material'
import { Controller, UseFormClearErrors } from 'react-hook-form'
import { FormValues } from '../../types'

export const InputNumber = ({
  control,
  index,
  clearErrors,
  hasError,
  hasFinished,
  inputName,
  fieldName,
}: {
  control: any
  index: number
  clearErrors: UseFormClearErrors<FormValues>
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
            clearErrors(inputName || '')
          }}
          error={hasError(index, fieldName || '')}
        />
      )}
    />
  )
}
