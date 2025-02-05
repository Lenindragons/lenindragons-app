import {
  Grid,
  keyframes,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import { Link } from 'react-router-dom'
import { getBall, getPlaceBall } from '@/utils/getPlaceBall'

const tableHeadStyle: React.CSSProperties = {
  textAlign: 'center',
  fontWeight: 'bold',
}

interface RankedPlayer {
  id: string
  name: string
  points: number
}

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

export const RankingTable = ({ rows }: { rows: RankedPlayer[], players: any[] }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={tableHeadStyle}>Lugar</TableCell>
            <TableCell style={tableHeadStyle}>Jogador</TableCell>
            <TableCell style={tableHeadStyle}>Pontos</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((player: any, index: number) => (
            <TableRow
              key={player.id}
              sx={{
                opacity: 0,
                animation: `${fadeIn} 0.5s forwards`,
                animationDelay: `${index * 0.1}s`,
                ...getBall(player.place)?.style,
              }}
            >
              <TableCell
                sx={{
                  textAlign: 'center',
                  color: index < 4 ? 'black' : null,
                }}
              >
                {player.place}
              </TableCell>
              <TableCell style={{ textAlign: 'center' }}>
                <Grid
                  container
                  spacing={1}
                  justifyContent="center"
                  alignItems="center"
                >
                  {getPlaceBall(player.place) && (
                    <Grid item sx={{ color: index < 4 ? 'black' : null }}>
                      {getPlaceBall(player.place)}
                    </Grid>
                  )}
                  <Grid item sx={{ color: index < 4 ? 'black' : null }}>
                    <Link
                      style={{ color: 'black' }}
                      to={`/profile/player/${player.playerId}`}
                    >
                      {player.name}
                    </Link>
                  </Grid>
                </Grid>
              </TableCell>
              <TableCell
                sx={{
                  textAlign: 'center',
                  color: index < 4 ? 'black' : null,
                }}
              >
                {player.points}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
