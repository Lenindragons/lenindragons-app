/* eslint-disable prettier/prettier */
import { DataGrid, GridColDef, GridValueGetterParams } from '@material-ui/data-grid'
import { render } from '@testing-library/react'
import { fi } from 'date-fns/locale'
import styled from 'styled-components'

const DataGridContainer = styled.div`
  .data-grid-header * {
    font-weight: bold !important;
  }
  
  .MuiDataGrid-row:nth-child(1),
  .MuiDataGrid-row:nth-child(2),
  .MuiDataGrid-row:nth-child(3) {
    background-color: #eee;
    font-weight: bold;
    color: #777 !important;
  } 
`

const columnConfig = {
  align: 'center',
  headerAlign: 'center',
  sortable: false,
  editable: false,
  filterable: false,
  hideSortIcons: true,
  hide: false,
  disableReorder: true,
  disableColumnMenu: true,
  headerClassName: 'data-grid-header',
}

const columns = [
  {
    field: 'id',
    headerName: 'Posição',
    width: 130,
    ...columnConfig,
  },
  {
    field: 'name',
    headerName: 'Jogador',
    width: 350,
    ...columnConfig,

  },
  {
    field: 'points',
    headerName: 'Pontos',
    type: 'number',
    width: 200,
    ...columnConfig,
    flex: 1,
  }
]

const rows = [
  { id: 1, name: 'Ju', points: 28 },
  { id: 2, name: 'Mauricio', points: 24 },
  { id: 3, name: 'Douglas', points: 22 },
  { id: 4, name: 'Erick', points: 18 },
  { id: 5, name: 'Matheus Dias', points: 16 },
  { id: 6, name: 'Emiliano', points: 14 },
  { id: 7, name: 'José Paulo', points: 13 },
  { id: 8, name: 'Jonas', points: 12 },
  { id: 9, name: 'Henrique', points: 9 },
  { id: 10, name: 'Douglas Kubiack', points: 7 },
  { id: 11, name: 'Fernando Machado', points: 6 },
  { id: 12, name: 'Gabriel (Jr.)', points: 6 },
  { id: 13, name: 'Gabriel Carneiro', points: 5 },
  { id: 14, name: 'Thiago', points: 4 },
  { id: 15, name: 'Marcos', points: 4 },
  { id: 16, name: 'Fernando', points: 3 },
  { id: 17, name: 'Eduardo Gomes', points: 3 },
  { id: 18, name: 'Isadora', points: 2 },
  { id: 19, name: 'João Vitor', points: 2 },
  { id: 20, name: 'Luan Carneiro', points: 1 },
  { id: 21, name: 'Douglas Coelho', points: 1 },
  { id: 21, name: 'Luahn', points: 1 },
]

export default function DataGridDemo() {
  return (
    <DataGridContainer style={{ height: 500, width: '100%', marginBottom: 200 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={20}
      />
    </DataGridContainer>
  )
}
