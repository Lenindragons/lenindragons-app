/* eslint-disable react/no-array-index-key */
/* eslint-disable react-hooks/rules-of-hooks */
import { useForm, Controller } from 'react-hook-form'
import {
  TextField,
  Button,
  Box,
  Typography,
  Card,
  Grid,
  Autocomplete,
  Avatar,
  Divider,
  Select,
  MenuItem,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormControl,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

import { useEffect, useState } from 'react'
import { Status } from '../../../../types/status'
import { useAuth } from '../../../../context/AuthContext'
import { getCurrency } from '../../../../utils/getCurrency'
import { getUsers } from '../../../../services/user'

export const CreateOrderPage = () => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: '',
      condition: '',
      code: '',
      freight: '',
      image: '',
      price: '',
      quantity: '',
    },
  })
  const [items, setItems] = useState<any[]>([])
  const [customer, setCustomer] = useState({ name: '', email: '', image: '' })
  const [customers, setCustomers] = useState<any[]>([])
  const [subtotal, setSubtotal] = useState(0)
  const [freight, setFreight] = useState(0)
  const { user } = useAuth()

  useEffect(() => {
    const fetchCustomers = async () => {
      const users = await getUsers()
      setCustomers(users)
    }
    const actualTotal = items.reduce(
      (acc, item: any) =>
        acc +
        parseFloat(item.price.replace(/\./g, '').replace(',', '.')) *
          parseInt(item?.quantity || 1, 10),
      0
    )
    setSubtotal(actualTotal)

    fetchCustomers()
  }, [items])

  const onSubmit = () => {
    const orderData = {
      customer,
      items,
      createdDate: Date.now(),
      status: Status.BUDGET_SENT,
      subtotal,
      freight,
      total: subtotal + freight,
      createdBy: user,
    }

    return orderData
  }

  const addNewItem = (item: any) => {
    setFreight(item.freight)
    setItems([...items, item])
    reset({
      name: '',
      condition: '',
      code: '',
      image: '',
      price: '',
      quantity: '',
    })
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <Box my={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            Resumo do Pedido
          </Typography>
          <Card>
            <Box p={2}>
              <Typography variant="h6">
                <strong>Cliente:</strong>
              </Typography>
              <Grid
                container
                gap={2}
                p={2}
                alignContent="center"
                alignItems="center"
              >
                <Avatar src={customer?.image} />
                <Typography>
                  {customer.name} - {customer.email}
                </Typography>
              </Grid>
              <Divider style={{ margin: '15px 0' }} />
              <Grid container alignContent="center" direction="row">
                <Grid item xs={4}>
                  <Typography variant="h6">
                    <strong>Subtotal:</strong>
                  </Typography>
                  <Typography>{getCurrency(subtotal)}</Typography>
                </Grid>
                {/* <Divider style={{ margin: '15px 0' }} /> */}
                <Grid item xs={4}>
                  <Typography variant="h6">
                    <strong>Frete:</strong>
                  </Typography>
                  <Typography>{getCurrency(freight)}</Typography>
                </Grid>
                {/* <Divider style={{ margin: '15px 0' }} /> */}
                <Grid item xs={4}>
                  <Typography variant="h6">
                    <strong>Total:</strong>
                  </Typography>
                  <Typography>{getCurrency(freight + subtotal)}</Typography>
                </Grid>
              </Grid>
            </Box>
          </Card>
        </Box>

        {items.length > 0 && (
          <Box>
            <Typography variant="h4" component="h1" gutterBottom>
              Itens
            </Typography>
            {items.map((item: any, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  gap: '5px',
                  justifyItems: 'space-between',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  padding: '10px',
                  marginBottom: '15px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    gap: '5px',
                    justifyItems: 'space-between',
                    justifyContent: 'space-between',
                    flexDirection: 'column',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      gap: '5px',
                      justifyItems: 'space-between',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: '100%',
                    }}
                  >
                    <img
                      src={item?.image || ''}
                      style={{ width: '100px' }}
                      alt={item.name}
                    />
                    <Typography>
                      <strong>
                        {item.name} - {item?.condition}
                      </strong>
                    </Typography>
                  </div>
                  <Typography>
                    <strong>Preço</strong>:{' '}
                    {getCurrency(
                      item?.price.replace(/\./g, '').replace(',', '.')
                    )}{' '}
                    - <strong>Quantidade</strong>: {item?.quantity}
                  </Typography>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Button
                    onClick={() => {
                      const newItems = items.filter((_, i) => i !== index)
                      setItems(newItems)
                    }}
                    style={{ width: '50px', height: '50px' }}
                    variant="text"
                    color="secondary"
                  >
                    <IconButton
                      aria-label="delete"
                      disabled
                      color="primary"
                      onClick={() => {
                        const newItems = items.filter((_, i) => i !== index)
                        setItems(newItems)
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Button>
                </div>
              </div>
            ))}
          </Box>
        )}
      </Grid>
      <Grid item xs={12} md={8}>
        <Box my={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            Criação do Pedido
          </Typography>

          {!customer?.name && (
            <Controller
              name="customer"
              control={control}
              defaultValue={null}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  options={customers}
                  noOptionsText="Nenhum cliente encontrado"
                  getOptionLabel={(option) => option.email}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Selecione o cliente"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                    />
                  )}
                  onChange={(_, data) => {
                    setCustomer({ name: '', email: '', image: '' })
                    if (data) {
                      field.onChange(data)
                      setCustomer(data)
                    }
                  }}
                />
              )}
            />
          )}
          <form onSubmit={handleSubmit(addNewItem)}>
            <Grid item sm={12}>
              <Controller
                name="freight"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <FormControl sx={{ mt: 2 }} fullWidth variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-amount">
                      Frete
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-amount"
                      startAdornment={
                        <InputAdornment position="start">R$</InputAdornment>
                      }
                      {...field}
                      label="Frete"
                    />
                  </FormControl>
                )}
              />
            </Grid>

            <Divider style={{ margin: '15px 0' }} />

            <Typography variant="h6" component="h1" gutterBottom>
              Cartas
            </Typography>

            <Grid container direction="row" justifyContent="space-between">
              <Grid item sm={6}>
                <Controller
                  name="name"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Nome da Carta"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                    />
                  )}
                />
              </Grid>

              <Grid item sm={3}>
                <Controller
                  name="condition"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <FormControl fullWidth sx={{ mt: 2 }}>
                      <InputLabel id="demo-simple-select-label">
                        Condição
                      </InputLabel>
                      <Select
                        {...field}
                        label="Condição"
                        id="demo-simple-select-label"
                      >
                        <MenuItem value="" />
                        <MenuItem value="M">M (Mint)</MenuItem>
                        <MenuItem value="NM">NM (Near Mint)</MenuItem>
                        <MenuItem value="SP">SP (Slightly Played)</MenuItem>
                        <MenuItem value="HP">HP (Heavily Played)</MenuItem>
                        <MenuItem value="D">D (Damaged)</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid item sm={2}>
                <Controller
                  name="code"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Código"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                    />
                  )}
                />
              </Grid>
            </Grid>

            <Controller
              name="image"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Link da imagem da carta"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
              )}
            />

            <Grid container direction="row" justifyContent="space-between">
              <Grid item sm={6}>
                <Controller
                  name="price"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <FormControl sx={{ mt: 2 }} fullWidth variant="outlined">
                      <InputLabel htmlFor="outlined-adornment-amount">
                        Preço
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-amount"
                        startAdornment={
                          <InputAdornment position="start">R$</InputAdornment>
                        }
                        {...field}
                        label="Preço"
                      />
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid item sm={5}>
                <Controller
                  name="quantity"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Quantidade"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                    />
                  )}
                />
              </Grid>
            </Grid>

            <Box mt={2}>
              <Button type="submit" variant="contained" color="primary">
                Adicionar Carta ao Pedido
              </Button>
            </Box>
          </form>
        </Box>
      </Grid>
    </Grid>
  )
}
