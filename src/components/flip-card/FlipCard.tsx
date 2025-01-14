import { Box, Typography } from "@mui/material";
import { useState } from "react";
import ReactCardFlip from "react-card-flip";

import {
  CatchingPokemon as CatchingPokemonIcon,
} from '@mui/icons-material'

const FlipCard = ({ front, back, frontLabel, backLabel, showLabel }: any) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  const style = {
    mb: 1,
    cursor: 'pointer',
    textDecoration: 'underline',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'end',
    gap: 1
  }

  return (
    <ReactCardFlip
      isFlipped={isFlipped}
      flipDirection="horizontal"
      flipSpeedFrontToBack={0.8}
      flipSpeedBackToFront={0.8}
    >
      <Box sx={{ mt: 3 }}>
        {showLabel && <Typography
          sx={{ ...style }}
          variant="body1"
          onClick={handleFlip}>
          <CatchingPokemonIcon /> {frontLabel}
        </Typography>}
        <>{front}</>
      </Box>

      <Box sx={{ mt: 3 }}>

        <Typography
          sx={{ ...style }}
          variant="body1"
          onClick={handleFlip}>

          <CatchingPokemonIcon />  {backLabel}
        </Typography>
        <>{back}</>
      </Box>
    </ReactCardFlip>
  );
};

export default FlipCard;
