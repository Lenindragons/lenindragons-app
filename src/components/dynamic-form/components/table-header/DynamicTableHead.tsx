import { TableCell, TableHead, TableRow } from '@mui/material'

const DynamicTableHead = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell>Lugar</TableCell>
        <TableCell>Nome</TableCell>
        <TableCell>Vitórias</TableCell>
        <TableCell>Derrotas</TableCell>
        <TableCell>Empates</TableCell>
        <TableCell>Deck</TableCell>
        <TableCell />
      </TableRow>
    </TableHead>
  )
}

export default DynamicTableHead
