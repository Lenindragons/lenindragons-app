import { useState } from 'react'
import { Button, TextField, List, ListItem, ListItemText, IconButton } from '@mui/material'
import { Delete } from '@mui/icons-material'

export const PlayerManagement = ({ players, setPlayers }: any) => {
  const [newName, setNewName] = useState<string>('')

  const handleAddName = () => {
    if (newName.trim() !== '') {
      setPlayers([...players, newName])
      setNewName('')
    }
  }

  const handleRemoveName = (nameToRemove: string) => {
    setPlayers(players.filter((name: string) => name !== nameToRemove))
  }

  return (
    <div>
      <TextField
        label="Nome"
        variant="outlined"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        fullWidth
        margin="normal"
        autoComplete='off'
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddName}
        fullWidth
        style={{ marginBottom: '16px' }}
      >
        Adicionar Nome
      </Button>

      <List>
        {players.map((name: string, index: number) => (
          <ListItem key={index} secondaryAction={
            <IconButton edge="end" onClick={() => handleRemoveName(name)}>
              <Delete />
            </IconButton>
          }>
            <ListItemText primary={name} />
          </ListItem>
        ))}
      </List>
    </div>
  )
}

