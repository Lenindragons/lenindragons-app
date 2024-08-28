/* eslint-disable import/extensions */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import useDeckStore, { Deck, PokemonIcon } from '@/services/decks/useDeckStore'
import { PokemonSelect } from '@/components/commons/pokemon-select/PokemonSelect'
import { Pokemon } from '@/pages/challenge/hooks/player-list/types'

type DeckValues = {
  id: string
  name: string
  icons: Pokemon[]
  type: string
}

export const DeckTable: React.FC = () => {
  const { decks, fetchDecks, deleteDeck, updateDeck } = useDeckStore()
  const { control, handleSubmit } = useForm<DeckValues>()
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [currentDeck, setCurrentDeck] = useState<Deck | null>({
    id: '',
    name: '',
    icons: [],
    type: '',
  })
  const [name, setName] = useState('')
  const [icons, setIcons] = useState([{}] as PokemonIcon[])

  useEffect(() => {
    fetchDecks()
  }, [fetchDecks])

  const handleEdit = (deck: Deck) => {
    setCurrentDeck(deck)
    setName(deck.name)
    setIcons(deck.icons)
    setEditDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    await deleteDeck(id)
  }

  const handleUpdate: SubmitHandler<DeckValues> = async (updatedValue: any) => {
    const { name, icons, type } = updatedValue
    const newValue = {
      id: currentDeck?.id ?? '',
      name: name || currentDeck?.name,
      icons: icons || currentDeck?.icons,
      type: type || currentDeck?.type,
    }

    await updateDeck(newValue.id, newValue.name, newValue.icons, newValue.type)
    setEditDialogOpen(false)
    setCurrentDeck(null)
    setName('')
    setIcons([])
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Ícones do Deck</TableCell>
            <TableCell>Nome do Deck</TableCell>
            <TableCell>Tipo</TableCell>
            <TableCell
              style={{
                textAlign: 'center',
              }}
            >
              Ações
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {decks.map((deck) => (
            <TableRow key={deck.id}>
              <TableCell sx={{ maxWidth: 50 }}>
                <Grid container alignContent="flex-start">
                  {deck.icons.map((icon, index) => (
                    <img
                      key={index}
                      src={icon.url}
                      alt="Icon"
                      style={{ width: 60 }}
                    />
                  ))}
                </Grid>
              </TableCell>
              <TableCell>{deck.name}</TableCell>
              <TableCell>{deck.type}</TableCell>
              <TableCell style={{ maxWidth: 150, textAlign: 'center' }}>
                <Grid
                  container
                  justifyContent="center"
                  alignContent="space-between"
                  gap={2}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleEdit(deck)}
                  >
                    Editar deck
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(deck.id)}
                  >
                    Remover
                  </Button>
                </Grid>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <FormControl component="form" onSubmit={handleSubmit(handleUpdate)}>
          <DialogTitle>Editar Deck</DialogTitle>
          <DialogContent>
            <TextField
              label="Nome do Deck"
              value={name}
              name="name"
              onChange={(e) => setName(e.target.value)}
              fullWidth
              margin="normal"
            />
            <FormControl fullWidth>
              <InputLabel id="type-label">Tipo:</InputLabel>
              <Controller
                name="type"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Select labelId="type-label" label="Tipo:" {...field}>
                    <MenuItem value="standard">Standard</MenuItem>
                    <MenuItem value="expanded">Expanded</MenuItem>
                    <MenuItem value="GLC">GYM Leader Challenge (GLC)</MenuItem>
                  </Select>
                )}
              />
            </FormControl>
            <PokemonSelect
              name="icons"
              control={control}
              defaultValue={icons}
            />
          </DialogContent>
          <DialogActions>
            <Button
              variant="outlined"
              color="error"
              onClick={() => setEditDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button variant="contained" type="submit" color="primary">
              Salvar
            </Button>
          </DialogActions>
        </FormControl>
      </Dialog>
    </TableContainer>
  )
}
