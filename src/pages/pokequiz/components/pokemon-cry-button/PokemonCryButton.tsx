import { IconButton } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp'; // Ícone de som

interface PokemonCryButtonProps {
  actualItem: { cry: string };
}

export const PokemonCryButton = ({ actualItem }: PokemonCryButtonProps) => {
  const handleClick = () => {
    const audio = new Audio(actualItem.cry);
    audio.play();
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyItems: 'center',
      alignItems: 'center',
    }}>
      <IconButton sx={{ border: '1px solid', marginBottom: '10px' }} color="primary" onClick={handleClick}>
        <VolumeUpIcon sx={{ fontSize: '50px' }} />
      </IconButton>
      <span>Som</span>
    </div>
  );
}