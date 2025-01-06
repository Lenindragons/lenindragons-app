import { formatDate } from "@/helpers/format-date";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
} from "@mui/material";

const MatchList = ({ matches, playerName, profilePlayerName }: any) => {

  const getDeck = (players: any, name: string) => {
    if (players[0].name === name) {
      return players[0].deck
    }
    return players[1].deck
  }


  return (
    <Box p={1}>
      <Typography variant="h5" gutterBottom>
        Lista de Partidas
      </Typography>
      <TableContainer component={Paper} elevation={4}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ textAlign: 'center' }}><strong>{playerName}</strong></TableCell>
              <TableCell></TableCell>
              <TableCell sx={{ textAlign: 'center' }}><strong>{profilePlayerName}</strong></TableCell>
              <TableCell sx={{ textAlign: 'center' }}>Data</TableCell>
              <TableCell sx={{ textAlign: 'center' }}>Resultado</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {matches.map((match: any, index: number) => (
              <TableRow key={index}>
                <TableCell>
                  <div style={{ display: 'flex', gap: 5, alignItems: 'center', justifyItems: 'center' }}>
                    {getDeck(match.players, playerName).name}
                    {getDeck(match.players, playerName).icons.map((icon: any) => {
                      return (
                        <img src={icon.url} alt={icon.name} style={{ width: "50px", height: "50px" }} />
                      )
                    })}
                  </div>
                </TableCell>
                <TableCell sx={{ textAlign: 'center' }}>VS</TableCell>

                <TableCell>
                  <div style={{ display: 'flex', gap: 3, alignItems: 'center', justifyItems: 'center' }}>

                    {getDeck(match.players, profilePlayerName).icons.map((icon: any) => {
                      return (
                        <img src={icon.url} alt={icon.name} style={{ width: "50px", height: "50px" }} />
                      )
                    })}
                    {getDeck(match.players, profilePlayerName).name}
                  </div>
                </TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{formatDate(match.date.toDate())}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{match.result?.name || "Empate"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default MatchList;
