import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { TextField, Button, Box, Modal, Typography } from '@mui/material'

interface Order {
  id?: string
  date: string
  status: string
  client: string
  totalValue: number
  items: string
}

const OrderForm: React.FC<any> = ({
  open,
  onClose,
  onSubmit,
  defaultValues,
}) => {
  const { handleSubmit, control, reset } = useForm<Order>({
    defaultValues,
  })

  React.useEffect(() => {
    reset(defaultValues)
  }, [defaultValues, reset])

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          p: 4,
          boxShadow: 24,
        }}
      >
        <Typography variant="h6" component="h2">
          Pedido
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Data"
                type="date"
                InputLabelProps={{ shrink: true }}
              />
            )}
          />
          <Controller
            name="status"
            control={control}
            render={({ field }) => <TextField {...field} label="Status" />}
          />
          <Controller
            name="client"
            control={control}
            render={({ field }) => <TextField {...field} label="Cliente" />}
          />
          <Controller
            name="totalValue"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Valor Total" type="number" />
            )}
          />
          <Controller
            name="items"
            control={control}
            render={({ field }) => <TextField {...field} label="Itens" />}
          />
          <Button type="submit" variant="contained">
            Salvar
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default OrderForm
