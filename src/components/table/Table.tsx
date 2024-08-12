/* eslint-disable react/prop-types */
import { DataGrid } from '@material-ui/data-grid'
import styled from 'styled-components'

const DataGridContainer = styled.div`
  .data-grid-header * {
    font-weight: bold !important;
  }
`

export const Table = ({ rows, columns }: { rows: any; columns: any }) => {
  return (
    <DataGridContainer
      style={{ height: 500, width: '100%', marginBottom: 200 }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={20}
        rowsPerPageOptions={[20]}
      />
    </DataGridContainer>
  )
}
