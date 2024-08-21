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
} from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import useDeckStore, {
  Deck,
  PokemonIcon,
} from '../../../../services/decks/useDeckStore'
import { PokemonSelect } from '../../../../components/commons/pokemon-select/PokemonSelect'
import { FormValues } from '../../../../components/dynamic-form/types'

export const DeckTable: React.FC = () => {
  const { decks, fetchDecks, deleteDeck, updateDeck } = useDeckStore()
  const { control, handleSubmit } = useForm<FormValues>()
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [currentDeck, setCurrentDeck] = useState<Deck | null>({
    id: '',
    name: '',
    icons: [],
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

  const handleUpdate: SubmitHandler<FormValues> = async (updatedValue: any) => {
    const { name, icons } = updatedValue
    const newValue = {
      id: currentDeck?.id || '',
      name: name ? name : currentDeck?.name,
      icons: icons ? icons : currentDeck?.icons,
    }

    await updateDeck(newValue.id, newValue.name, newValue.icons)
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
            <TableCell sx={{ maxWidth: 50 }}>Ícones do Deck</TableCell>
            <TableCell>Nome do Deck</TableCell>
            <TableCell style={{ textAlign: 'center' }}>Ações</TableCell>
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
              <TableCell style={{ maxWidth: 100, textAlign: 'center' }}>
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
              onChange={(e) => setName(e.target.value)}
              fullWidth
              margin="normal"
            />
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
