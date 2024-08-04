import { useEffect, useState } from 'react'
import { Table } from '../../components/table/Table'
import { Modal } from '../../components/commons/modal/Modal'
import { PlayerForm } from './forms/PlayerForm'
import { usePage } from '../../context/PageContext'
import { getPlayers } from '../../services/players'

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
      field: 'name',
      headerName: 'Nome:',
      width: 130,
      ...columnConfig,
    },
    {
      field: 'email',
      headerName: 'Email:',
      width: 450,
      ...columnConfig,
    },
  ]

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
    <main>
      <header>
        <h2>Lista de Jogadores</h2>
      </header>
      <section>
        <div>
          <Modal label="Adicionar jogador" isOpen={isOpen}>
            <PlayerForm callback={handleAddPlayer} closeModal={setIsOpen} />
          </Modal>
        </div>
        <Table rows={players} columns={columns} />
      </section>
    </main>
  )
}
