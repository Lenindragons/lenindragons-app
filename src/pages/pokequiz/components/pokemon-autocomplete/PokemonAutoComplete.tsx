import { useEffect, useState } from "react";
import { Autocomplete, TextField, Avatar } from "@mui/material";
import { getDatabase } from "../../utils/localstorage";

export const PokemonAutocomplete = ({ ref, onKeyDown, onChange }: any) => {
  const [pokemons, setPokemons] = useState<any>([])
  const [, setSelectedPokemon] = useState<any>(null);

  useEffect(() => {
    const catchAllPokemons = async () => {
      const catched = await getDatabase()
      setPokemons(catched)
    }
    catchAllPokemons()
  }, [])

  return (
    <Autocomplete
      ref={ref}
      options={pokemons}
      sx={{ width: '100%', fontSize: '40px', fontWeight: 'bold' }}
      getOptionLabel={(option: any) => option?.name}
      renderOption={(props, option) => (
        <li {...props} key={option?.name} style={
          { display: "flex", alignItems: "center", gap: "10px", textTransform: 'capitalize' }}>
          <Avatar src={option?.image} alt={option?.name} />
          {option.name}
        </li>
      )}
      onChange={(_, newValue: any) => {
        setSelectedPokemon(newValue)
        onChange(newValue.name)
      }}
      onKeyDown={onKeyDown}
      renderInput={(params) =>
        <TextField
          sx={
            {
              margin: '10px 0',
              '& .MuiInputBase-input': {
                fontSize: '40px',
                fontWeight: 'bold',
                outline: 'none',
                textAlign: 'center',
                width: "100%"
              },
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  border: "none"
                }
              },
              outline: 'none',
              border: '5px solid #eee',
              borderRadius: '10px',
              height: '100%',
              width: '100%',
            }
          }
          {...params} label="Escolha um Pokémon" variant="outlined" />
      }
    />
  );
}
