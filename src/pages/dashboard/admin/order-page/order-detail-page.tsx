import { Container, Typography, Paper, Grid } from '@mui/material'

export const OrderDetailPage = () => {
  const order = {
    id: '',
    date: '',
    status: '',
    client: '',
    totalValue: '',
    items: '',
  }
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Detalhe do Pedido
      </Typography>
      <Paper sx={{ padding: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6">ID do Pedido</Typography>
            <Typography>{order.id}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Data</Typography>
            <Typography>{order.date}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Status</Typography>
            <Typography>{order.status}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Cliente</Typography>
            <Typography>{order.client}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Valor Total</Typography>
            <Typography>{order.totalValue}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Itens</Typography>
            <Typography>{order.items}</Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  )
}
