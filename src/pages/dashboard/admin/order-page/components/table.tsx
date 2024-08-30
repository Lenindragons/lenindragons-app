import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material'

interface Order {
  id: string
  date: string
  status: string
  client: string
  totalValue: number
  items: string
}

interface OrderTableProps {
  orders: Order[]
  onEdit: (order: Order) => void
  onDelete: (id: string) => void
}

const OrderTable: React.FC<OrderTableProps> = ({
  orders,
  onEdit,
  onDelete,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Data</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Cliente</TableCell>
            <TableCell>Valor Total</TableCell>
            <TableCell>Itens</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.date}</TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell>{order.client}</TableCell>
              <TableCell>{order.totalValue}</TableCell>
              <TableCell>{order.items}</TableCell>
              <TableCell>
                <Button onClick={() => onEdit(order)}>Editar</Button>
                <Button onClick={() => onDelete(order.id)}>Excluir</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default OrderTable
