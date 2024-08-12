import { useEffect, useState } from 'react'
import { DataGrid, GridColDef, GridToolbar } from '@material-ui/data-grid'
import Button from '@mui/material/Button'
import { IconButton } from '@mui/material'
import { Delete, Edit } from '@mui/icons-material'
import { getEvents } from '../../../../services/events'
import { useEvents } from '../../../../context/EventContext'

// eslint-disable-next-line react/prop-types
const GridContainer = ({ selectedRows = [] }) => {
  return (
    <div>
      <GridToolbar />
      {selectedRows.length > 1 && (
        <Button
          variant="outlined"
          color="secondary"
          style={{ marginLeft: '8px' }}
        >
          Remove Selected
        </Button>
      )}
    </div>
  )
}

const EventList = () => {
  const [events, setEvents] = useState([])
  const { onSelectionModelChange } = useEvents()

  useEffect(() => {
    getEvents(setEvents)
  }, [])

  const handleEdit = (id: string) => {
    console.log(id)
  }

  const handleRemove = (id: string) => {
    console.log(id)
  }

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Nome', width: 330 },
    {
      field: 'startDate',
      headerName: 'Data de Inicio',
      width: 330,
    },
    {
      field: 'endDate',
      headerName: 'Data de Fim',
      width: 330,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 330,
      renderCell: (params) => (
        <>
          <IconButton color="primary" onClick={() => handleEdit(params.row.id)}>
            <Edit />
          </IconButton>

          <IconButton color="error" onClick={() => handleRemove(params.row.id)}>
            <Delete />
          </IconButton>
        </>
      ),
    },
  ]

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={events}
        columns={columns}
        pageSize={5}
        checkboxSelection
        onSelectionModelChange={onSelectionModelChange}
        components={{
          Toolbar: GridContainer,
        }}
      />
    </div>
  )
}

export default EventList
