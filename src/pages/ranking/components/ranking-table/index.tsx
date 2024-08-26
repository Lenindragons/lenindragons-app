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
import MasterBall from '@/assets/masterball.png'
import GreatBall from '@/assets/greatball.png'
import UltraBall from '@/assets/ultraball.png'
import PokeBall from '@/assets/pokeball.png'

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

export const RankingTable = ({ rows }: { rows: RankedPlayer[] }) => {
  const getBall = (place: string) => {
    const commonStyle = {
      textAlign: 'center',
      color: 'white',
      fontWeight: 'bold',
    }
    switch (parseInt(place, 10)) {
      case 1:
        return {
          icon: MasterBall,
          style: {
            background: 'linear-gradient(135deg, #6a0dad, #ff69b4, #ffffff)',
            ...commonStyle,
          },
        }
      case 2:
        return {
          icon: UltraBall,
          style: {
            background: 'linear-gradient(to right, #4b4b4b, #ffd700, #f0f0f0)',
            ...commonStyle,
          },
        }
      case 3:
        return {
          icon: GreatBall,
          style: {
            background: 'linear-gradient(to right, #4169e1, #87cefa, #f0f0f0)',
            ...commonStyle,
          },
        }
      case 4:
        return {
          icon: PokeBall,
          style: {
            background: 'linear-gradient(to right, #ff0000, #ffffff, #f0f0f0)',
            ...commonStyle,
          },
        }
      default:
        return { icon: null, style: { ...commonStyle } }
    }
  }

  const getPlaceBall = (place: string) => {
    const pokeball = getBall(place)

    return (
      pokeball.icon && (
        <img
          width={25}
          security="restricted"
          src={pokeball.icon}
          alt="place icon"
        />
      )
    )
  }

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
          {rows.map((player: any, index: number) => (
            <TableRow
              key={player.id}
              sx={{
                opacity: 0,
                animation: `${fadeIn} 0.5s forwards`,
                animationDelay: `${index * 0.1}s`,
                ...getBall(player.place)?.style,
              }}
            >
              <TableCell style={{ textAlign: 'center' }}>
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
                    <Grid item>{getPlaceBall(player.place)}</Grid>
                  )}
                  <Grid item>{player.name}</Grid>
                </Grid>
              </TableCell>
              <TableCell style={{ textAlign: 'center' }}>
                {player.points}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
