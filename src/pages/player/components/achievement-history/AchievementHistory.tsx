
import { formatDate } from "@/helpers/format-date"
import { getPlayerById } from "@/services/players"
import { Alert } from "@mui/material"
import { useEffect, useState } from "react"

export const AchievementHistory = ({ playerId }: { playerId: string | null }) => {
  const [player, setPlayer] = useState<any>({ name: '' })

  useEffect(() => {
    const fetchPlayers = async () => {
      const play = (await getPlayerById(playerId || ''))
      setPlayer(play)
    }

    fetchPlayers()
  }, [playerId])

  return (<>{player?.achievements?.map((a: any) =>
    <Alert variant="outlined" color="info" severity="info" sx={{ mb: 1 }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
        <h3 style={{ flexGrow: 1 }}>{a.name}</h3>
        <p><strong>Data do Evento</strong>: {formatDate(a.achievementDate.toDate())}</p>
        <p><strong>Descrição</strong>: {a.description}</p>
      </div>
    </Alert>)}</>)
}