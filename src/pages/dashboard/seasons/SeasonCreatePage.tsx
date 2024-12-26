/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/require-default-props */
import {
  Button,
  FormControl,
  Autocomplete,
  Box,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material'

import { Controller, useForm, useWatch } from 'react-hook-form'
import { useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
import { useNavigate } from 'react-router-dom'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { createEvent } from '@/services/events'
import DateRange from '@/components/commons/date-range/Daterage'
import { getPokemons } from '@/services/poke-api/client'
import 'react-quill/dist/quill.snow.css'
import Dialog from '@/components/simple-dialog'

export const SeasonCreatePage = () => {
  const [options, setOptions] = useState<any[]>([])
  const [pokemon, setPokemon] = useState<any>(null)
  const [labelDate, setLabelDate] = useState<string>('')
  const navigate = useNavigate()

  const { handleSubmit, register, control } = useForm<any>({
    defaultValues: [],
  })

  const isAllFieldsFilled = (formData: any) => {
    const { name, dates, icon, type, description } = formData

    if (name && dates && dates.length > 0 && icon && type && description) {
      return true
    }

    return false
  }

  const normalizeData = (data: any) => {
    const values = [4, 6, 8]
      .map((place) => {
        return [1, 2, 3, 4, 5, 6, 7, 8].map((position) => {
          return {
            place,
            position,
            value: data[`top${place}Place${position}`],
          }
        })
      })
      .flat()

    const getTopValues = (place: number) => {
      return {
        min: parseFloat(data[`top${[place]}MinValue`]),
        max: parseFloat(data[`top${[place]}MaxValue`]),
        percentByPosition: values
          .filter((value) => value?.place === place)
          .map((value) => ({
            position: value.position,
            value: parseFloat(value.value),
          })),
      }
    }

    return {
      top4: getTopValues(4),
      top6: getTopValues(6),
      top8: getTopValues(8),
    }
  }

  const onSubmit = async (formData: any): Promise<any> => {
    const { name, dates, icon, type, description } = formData

    createEvent({
      name,
      dates,
      icon,
      type,
      description,
      values: normalizeData(formData),
    })
    navigate('/seasons')
  }

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const pokemons = await getPokemons()
        setOptions(pokemons)
      } catch (err) {
        console.error(err)
      }
    }

    fetchPokemons()
  }, [])

  const onAutoCompleteSubmit = async (value: string) => {
    try {
      const pokemons = await getPokemons()
      setOptions(pokemons)
      setPokemon(value)
    } catch (err) {
      console.error(err)
    }
  }

  const formValues = useWatch({ control })

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  }

  useEffect(() => {
    if (formValues.dates) {
      const { startDate, endDate } = formValues.dates[0]

      const start = formatDate(startDate)
      const end = formatDate(endDate)

      const label = start === end ? start : `${start} - ${end}`
      setLabelDate(label)
    }
  }, [formValues])

  return (
    <Box
      padding={4}
      sx={{
        width: '100%',
        height: '100vw',
        overflow: 'auto',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mb: 4,
          alignItems: 'center',
        }}
      >
        <Typography variant="h4">Configurações para nova temporada</Typography>
        <Button
          type="submit"
          sx={{ padding: '10px 20px' }}
          variant="contained"
          disabled={!isAllFieldsFilled(formValues)}
          onClick={handleSubmit(onSubmit)}
        >
          Cadastrar Temporada
        </Button>
      </Box>

      <FormControl fullWidth>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Geral</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid
              spacing={2}
              sx={{
                display: 'grid',
                gridTemplate: `"name name date" auto / 1fr 1fr 1fr`,
                gap: 5,
                mb: 2,
              }}
            >
              <TextField
                label="Nome da Temporada:"
                sx={{ width: '100%', gridColumn: 'name' }}
                variant="outlined"
                {...register('name', { required: true })}
              />

              <Box sx={{ gridColumn: 'date' }}>
                <Dialog
                  title={labelDate === '' ? 'Adicionar periodo' : labelDate}
                >
                  <DateRange
                    label="Data de Inicio e Fim da Temporada:"
                    name="dates"
                    control={control}
                  />
                </Dialog>
              </Box>
            </Grid>

            <Box mb={2}>
              <Controller
                name="icon"
                control={control}
                defaultValue={pokemon}
                render={({ field: { value, ref, onBlur, onChange } }) => (
                  <Autocomplete
                    value={value}
                    style={{ marginTop: 10 }}
                    options={options}
                    onBlur={onBlur}
                    ref={ref}
                    isOptionEqualToValue={(option, value) => {
                      return option.name === value.name
                    }}
                    onChange={(_evt, newValue) => {
                      onChange(newValue)
                    }}
                    getOptionLabel={(option) => {
                      return option.name
                    }}
                    onInputChange={(_evt, newInputValue) => {
                      if (newInputValue) {
                        onAutoCompleteSubmit(newInputValue)
                      } else {
                        setOptions([])
                      }
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Icone da Temporada:"
                        variant="outlined"
                      />
                    )}
                  />
                )}
              />
            </Box>

            <FormControl fullWidth>
              <InputLabel id="type-label">Tipo:</InputLabel>
              <Controller
                name="type"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Select labelId="type-label" label="Tipo:" {...field}>
                    <MenuItem value="season">Temporada</MenuItem>
                    <MenuItem value="league_challenge">
                      League Challenge
                    </MenuItem>
                    <MenuItem value="league_cup">League Cup</MenuItem>
                    <MenuItem value="GLC">GYM Leader Challenge (GLC)</MenuItem>
                    <MenuItem value="others">Outros</MenuItem>
                  </Select>
                )}
              />
            </FormControl>
            <br />
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Regras da Temporada</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box mb={2}>
              <Controller
                name="description"
                control={control}
                rules={{
                  required:
                    'Por favor escreva uma descrição para as regras dessa temporada.',
                }}
                render={({ field }) => (
                  <ReactQuill
                    {...field}
                    theme="snow"
                    placeholder=""
                    style={{ height: '200px' }}
                    onChange={(text) => {
                      field.onChange(text)
                    }}
                  />
                )}
              />
            </Box>
            <br />
            <br />
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Valores e Porcentagens</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="h6">TOP 4</Typography>
            <Box mt={2} mb={2} sx={{ display: 'flex' }} gap={2}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  gap: 2,
                  padding: 2,
                  justifyContent: 'start-space-between',
                  width: '20%',
                  minWidth: '150px',
                }}
              >
                <TextField
                  label="Valor Mínimo:"
                  variant="outlined"
                  sx={{ flexGrow: 1 }}
                  defaultValue={0}
                  {...register('top4MinValue')}
                />
                <TextField
                  label="Valor Máximo:"
                  variant="outlined"
                  sx={{ flexGrow: 1 }}
                  defaultValue={640}
                  {...register('top4MaxValue')}
                />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  gap: 2,
                  backgroundColor: 'rgba(0, 0, 0, 0.1)',
                  padding: 2,
                  justifyContent: 'start-space-between',
                }}
              >
                <TextField
                  label="Porcentagem: 1 Lugar"
                  variant="outlined"
                  sx={{ flexGrow: 1 }}
                  defaultValue={50}
                  {...register('top4Place1')}
                />
                <TextField
                  label="Porcentagem: 2 Lugar"
                  variant="outlined"
                  sx={{ flexGrow: 1 }}
                  defaultValue={25}
                  {...register('top4Place2')}
                />
                <TextField
                  label="Porcentagem: 3 Lugar"
                  variant="outlined"
                  sx={{ flexGrow: 1 }}
                  defaultValue={12.5}
                  {...register('top4Place3')}
                />
                <TextField
                  label="Porcentagem: 4 Lugar"
                  variant="outlined"
                  sx={{ flexGrow: 1 }}
                  defaultValue={12.5}
                  {...register('top4Place4')}
                />
                <TextField
                  label="Porcentagem: 5 Lugar"
                  variant="outlined"
                  sx={{ flexGrow: 1 }}
                  defaultValue={0}
                  {...register('top4Place5')}
                />
                <TextField
                  label="Porcentagem: 6 Lugar"
                  variant="outlined"
                  sx={{ flexGrow: 1 }}
                  defaultValue={0}
                  {...register('top4Place6')}
                />
                <TextField
                  label="Porcentagem: 7 Lugar"
                  variant="outlined"
                  sx={{ flexGrow: 1 }}
                  defaultValue={0}
                  {...register('top4Place7')}
                />
                <TextField
                  label="Porcentagem: 8 Lugar"
                  variant="outlined"
                  sx={{ flexGrow: 1 }}
                  defaultValue={0}
                  {...register('top4Place8')}
                />
              </Box>
            </Box>

            <Typography variant="h6">TOP 6</Typography>
            <Box mt={2} mb={2} sx={{ display: 'flex' }} gap={2}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  gap: 2,
                  padding: 2,
                  justifyContent: 'start-space-between',
                  width: '20%',
                  minWidth: '150px',
                }}
              >
                <TextField
                  label="Valor Mínimo:"
                  variant="outlined"
                  sx={{ flexGrow: 1 }}
                  defaultValue={640.01}
                  {...register('top6MinValue')}
                />
                <TextField
                  label="Valor Máximo:"
                  variant="outlined"
                  sx={{ flexGrow: 1 }}
                  defaultValue={800}
                  {...register('top6MaxValue')}
                />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  gap: 2,
                  backgroundColor: 'rgba(0, 0, 0, 0.1)',
                  padding: 2,
                  justifyContent: 'start-space-between',
                }}
              >
                <TextField
                  label="Porcentagem: 1 Lugar"
                  variant="outlined"
                  sx={{ flexGrow: 1 }}
                  defaultValue={40}
                  {...register('top6Place1')}
                />
                <TextField
                  label="Porcentagem: 2 Lugar"
                  variant="outlined"
                  sx={{ flexGrow: 1 }}
                  defaultValue={20}
                  {...register('top6Place2')}
                />
                <TextField
                  label="Porcentagem: 3 Lugar"
                  variant="outlined"
                  sx={{ flexGrow: 1 }}
                  defaultValue={10}
                  {...register('top6Place3')}
                />
                <TextField
                  label="Porcentagem: 4 Lugar"
                  variant="outlined"
                  sx={{ flexGrow: 1 }}
                  defaultValue={10}
                  {...register('top6Place4')}
                />
                <TextField
                  label="Porcentagem: 5 Lugar"
                  variant="outlined"
                  sx={{ flexGrow: 1 }}
                  defaultValue={10}
                  {...register('top6Place5')}
                />
                <TextField
                  label="Porcentagem: 6 Lugar"
                  variant="outlined"
                  sx={{ flexGrow: 1 }}
                  defaultValue={10}
                  {...register('top6Place6')}
                />
                <TextField
                  label="Porcentagem: 7 Lugar"
                  variant="outlined"
                  sx={{ flexGrow: 1 }}
                  defaultValue={0}
                  {...register('top6Place7')}
                />
                <TextField
                  label="Porcentagem: 8 Lugar"
                  variant="outlined"
                  sx={{ flexGrow: 1 }}
                  defaultValue={0}
                  {...register('top6Place8')}
                />
              </Box>
            </Box>

            <Typography variant="h6">TOP 8</Typography>
            <Box mt={2} mb={2} sx={{ display: 'flex' }} gap={2}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  gap: 2,
                  padding: 2,
                  justifyContent: 'start-space-between',
                  width: '20%',
                  minWidth: '150px',
                }}
              >
                <TextField
                  label="Valor Mínimo:"
                  variant="outlined"
                  sx={{ width: '100%' }}
                  defaultValue={800.01}
                  {...register('top8MinValue')}
                />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  gap: 2,
                  backgroundColor: 'rgba(0, 0, 0, 0.1)',
                  padding: 2,
                  justifyContent: 'start-space-between',
                }}
              >
                <TextField
                  label="Porcentagem: 1 Lugar"
                  variant="outlined"
                  sx={{ flexGrow: 1 }}
                  defaultValue={30}
                  {...register('top8Place1')}
                />
                <TextField
                  label="Porcentagem: 2 Lugar"
                  variant="outlined"
                  sx={{ flexGrow: 1 }}
                  defaultValue={15}
                  {...register('top8Place2')}
                />
                <TextField
                  label="Porcentagem: 3 Lugar"
                  variant="outlined"
                  sx={{ flexGrow: 1 }}
                  defaultValue={10}
                  {...register('top8Place3')}
                />
                <TextField
                  label="Porcentagem: 4 Lugar"
                  variant="outlined"
                  sx={{ flexGrow: 1 }}
                  defaultValue={10}
                  {...register('top8Place4')}
                />
                <TextField
                  label="Porcentagem: 5 Lugar"
                  variant="outlined"
                  sx={{ flexGrow: 1 }}
                  defaultValue={9}
                  {...register('top8Place5')}
                />
                <TextField
                  label="Porcentagem: 6 Lugar"
                  variant="outlined"
                  sx={{ flexGrow: 1 }}
                  defaultValue={9}
                  {...register('top8Place6')}
                />
                <TextField
                  label="Porcentagem: 7 Lugar"
                  variant="outlined"
                  sx={{ flexGrow: 1 }}
                  defaultValue={8.5}
                  {...register('top8Place7')}
                />
                <TextField
                  label="Porcentagem: 8 Lugar"
                  variant="outlined"
                  sx={{ flexGrow: 1 }}
                  defaultValue={8.5}
                  {...register('top8Place8')}
                />
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>
      </FormControl>
    </Box>
  )
}
