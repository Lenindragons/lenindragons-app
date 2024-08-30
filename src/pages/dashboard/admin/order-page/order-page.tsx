import { useState, useEffect } from 'react'
import { Container, Typography, Box, Button } from '@mui/material'
import OrderForm from './components/form'
import OrderTable from './components/table'

interface Order {
  id: string
  date: string
  status: string
  client: string
  totalValue: number
  items: string
}

export const OrderPage = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [editingOrder, setEditingOrder] = useState<Order | undefined>(undefined)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    // Fetch orders from your data source
    const fetchOrders = async () => {
      // Example data
      const neworders = [
        {
          id: '1',
          date: '2023-10-01',
          status: 'Pending',
          client: 'John Doe',
          totalValue: 100,
          items: 'Item1, Item2',
        },
        {
          id: '2',
          date: '2023-10-02',
          status: 'Completed',
          client: 'Jane Smith',
          totalValue: 200,
          items: 'Item3, Item4',
        },
      ]
      setOrders(neworders)
    }
    fetchOrders()
  }, [])

  const handleAddOrder = (order: Order) => {
    setOrders([...orders, { ...order, id: String(orders.length + 1) }])
    setIsModalOpen(false)
  }

  const handleEditOrder = (order: Order) => {
    setOrders(orders.map((o) => (o.id === order.id ? order : o)))
    setEditingOrder(undefined)
    setIsModalOpen(false)
  }

  const handleDeleteOrder = (id: string) => {
    setOrders(orders.filter((o) => o.id !== id))
  }

  const handleOpenModal = () => {
    setEditingOrder(undefined)
    setIsModalOpen(true)
  }

  const handleEdit = (order: Order) => {
    setEditingOrder(order)
    setIsModalOpen(true)
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Pedidos
      </Typography>
      <Box mb={4}>
        <Button variant="contained" onClick={handleOpenModal}>
          Adicionar Pedido
        </Button>
      </Box>
      <OrderTable
        orders={orders}
        onEdit={handleEdit}
        onDelete={handleDeleteOrder}
      />
      <OrderForm
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={editingOrder ? handleEditOrder : handleAddOrder}
        defaultValues={editingOrder}
      />
    </Container>
  )
}
