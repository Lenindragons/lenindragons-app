import styled from 'styled-components'
import { Button, Dialog } from '@mui/material'
import { useState } from 'react'
import { DeckTable } from './components/deck-table/DeckTable'
import { CreateDeck } from './forms/CreateDeck'

const Box = styled.section`
  padding: 16px;
  margin: 16px;
`

export const DeckPage: React.FC = () => {
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  return (
    <Box>
      <div style={{ marginBottom: 15 }}>
        <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
          <CreateDeck />
        </Dialog>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setEditDialogOpen(true)}
        >
          Criar Deck
        </Button>
      </div>
      <DeckTable />
    </Box>
  )
}
