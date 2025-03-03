import { Button, Card } from "@mui/material";
import { useState } from "react";
import { PlayerManagement } from "../player-management/PlayerManagement";

export const PlayerTracking = () => {
  const [players, setPlayers] = useState<string[]>([])
  const [initGame, setInitGame] = useState<boolean>(false)

  return (
    <Card
      sx={{
        position: "fixed",
        bottom: 16,
        right: 16,
        p: 2,
        boxShadow: 3,
        backgroundColor: "white",
        width: 450,
        zIndex: 1000,
      }}
    >
      {!initGame &&
        <PlayerManagement
          setPlayers={setPlayers}
          players={players} />}

      {!!players.length && !initGame &&
        <Button
          sx={{ width: "100%" }}
          type="button"
          variant="contained"
          color="success"
          onClick={() => setInitGame(true)}
        >Iniciar Jogo</Button>}
    </Card>
  );
};
