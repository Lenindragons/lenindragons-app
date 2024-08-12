import { useEffect, useState } from 'react'
import { TableContainer } from '@mui/material'
import { Table } from '../../components/table/Table'
import { Modal } from '../../components/commons/modal/Modal'
import { PlayerForm } from './forms/PlayerForm'
import { usePage } from '../../context/PageContext'
import { getPlayers } from '../../services/players'
import { Box } from '../events/Events'

export const PlayersPage = () => {
  const { setTitle } = usePage()
  const [players, setPlayers] = useState<any>([])

  useEffect(() => {
    setTitle('Jogadores')
  }, [setTitle])

  useEffect(() => {
    const fetchPlayers = async () => {
      setPlayers(await getPlayers())
    }

    fetchPlayers()
  }, [])

  const [isOpen, setIsOpen] = useState(false)

  const handleAddPlayer = (data: any) => {
    setPlayers([
      ...players,
      {
        id: players.length + 1,
        name: data.name,
        email: data.email,
      },
    ])
  }

  return (
    <Box>
      <div style={{ marginBottom: 15 }}>
        <Modal label="Adicionar jogador" isOpen={isOpen}>
          <PlayerForm callback={handleAddPlayer} closeModal={setIsOpen} />
        </Modal>
      </div>
      <TableContainer>
        <Table rows={players} setPlayers={setPlayers} />
      </TableContainer>
    </Box>
  )
}
