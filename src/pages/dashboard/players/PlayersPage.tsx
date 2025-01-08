import { useEffect, useState } from 'react'
import { Tab, TableContainer, Tabs } from '@mui/material'
import { Table } from '@/components/table/Table'
import { PlayerForm } from './forms/PlayerForm'
import { usePage } from '@/context/PageContext'
import { getPlayers } from '@/services/players'
import { Box } from '../seasons/Seasons'
import { TabPanel } from '@/components/tab-panel'
import BasicModal from '@/components/commons/modal/ModalMUI'

export const PlayersPage = () => {
  const { setTitle } = usePage()
  const [players, setPlayers] = useState<any>([])
  const [value, setValue] = useState(0)

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  useEffect(() => {
    setTitle('Jogadores')
  }, [setTitle])

  useEffect(() => {
    const fetchPlayers = async () => {
      setPlayers(await getPlayers())
    }

    fetchPlayers()
  }, [])

  const [setIsOpen] = useState(false)

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
        <BasicModal label="Adicionar jogador">
          <PlayerForm callback={handleAddPlayer} closeModal={setIsOpen} />
        </BasicModal>
      </div>

      <Tabs value={value} onChange={handleChange}>
        <Tab label="Credenciados" />
        <Tab label="Sem credenciais" />
      </Tabs>

      <TabPanel value={value} index={0} sx={{ pt: 1 }}>
        <TableContainer>
          <Table rows={players.filter((player: any) => player.lastLoginAt)} setPlayers={setPlayers} />
        </TableContainer>
      </TabPanel>

      <TabPanel value={value} index={1} sx={{ pt: 1 }}>
        <TableContainer>
          <Table rows={players.filter((player: any) => !player.lastLoginAt)} setPlayers={setPlayers} />
        </TableContainer>
      </TabPanel>
    </Box>
  )
}
