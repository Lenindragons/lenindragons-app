/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/require-default-props */
import { Controller, useForm } from 'react-hook-form'
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material'
import DateRange from '@/components/commons/date-range/Daterage'
import Button from '@/components/commons/button/Button'
import { ChallengeFormContainer } from './challenge-form-style'

type ChallengeFormProps = {
  callback: (data: any) => void
  data?: any
}

export const ChallengeForm = ({ callback, data }: ChallengeFormProps) => {
  const { handleSubmit, register, control } = useForm({
    defaultValues: data,
  })

  const onSubmit = async (formData: any): Promise<any> => {
    callback(formData)
  }

  return (
    <ChallengeFormContainer onSubmit={handleSubmit(onSubmit)}>
      <FormControl fullWidth sx={{ m: 1 }} style={{ display: 'flex', gap: 5 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <TextField
              label="Quantidade de rodadas"
              type="number"
              variant="outlined"
              defaultValue={3}
              {...register('rounds', { required: true })}
            />

            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Tipo:
              </FormLabel>
              <Controller
                name="type"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <RadioGroup
                    {...field}
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel
                      value="normal"
                      control={<Radio />}
                      label="Normal"
                    />
                    <FormControlLabel
                      value="special"
                      control={<Radio />}
                      label="Especial"
                    />
                  </RadioGroup>
                )}
              />
            </FormControl>

            <TextField
              label="Tempo das rodadas"
              type="number"
              variant="outlined"
              defaultValue={40}
              {...register('roundTime', { required: true })}
            />
          </div>
          <DateRange label="Data do torneio:" name="dates" control={control} />
        </div>
        <Button>Cadastrar Torneio</Button>
      </FormControl>
    </ChallengeFormContainer>
  )
}
