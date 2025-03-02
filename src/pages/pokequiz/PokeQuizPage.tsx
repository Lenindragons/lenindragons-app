import { WebPageTemplate } from "@/templates/webpage/WebPageTools"
import { TextField } from "@mui/material"
import { useEffect, useRef, useState } from "react"
import { uhull } from "./utils/confeti"
import { Result } from "./components/result/Result"
import { styled } from "styled-components"
import { AwesomeButton } from "react-awesome-button"
import { getPokemonData } from "./game/game"
import { PokemonGrid } from "./components/pokemon-grid/PokemonGrid"
import { PokemonCryButton } from "./components/pokemon-cry-button/PokemonCryButton"

export const PokeQuizPage = () => {

  const [pokemon, setPokemon] = useState<any>(null)
  const [pokemons, setPokemons] = useState<any>([])
  const [actualPokemon, setActualPokemon] = useState<any>('')
  const [isWinner, setIsWinner] = useState(false)
  const [isRevealed, setIsRevealed] = useState(false)
  const [isTipsActive, setActiveTips] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    getPokemonData().then((data) => setPokemon(data))
  }, [])

  const handleClick = async (event: any) => {
    event.preventDefault()
    scrollToBottom()
    if (actualPokemon === pokemon.name) {
      setTimeout(() => {
        scrollToTop()
        setIsWinner(true)
        uhull()
      }, 2000)
    }
    const newPokemon = await getPokemonData(actualPokemon)
    setPokemons([...pokemons, newPokemon])
  }

  const scrollToTop = () => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', })
    }
  }

  const scrollToBottom = () => {
    if (inputRef.current) {
      inputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' })
    }
  }

  const handleChange = (event: any) => {
    event.preventDefault()
    const { value } = event.target
    setActualPokemon(value)
  }

  const Title = styled.h1`
    margin: 20px 0;
  `

  const legends = [
    'Pokemon',
    'Tipo 1',
    'Tipo 2',
    'Habitat',
    'Cor',
    'Tamanho',
    'Peso',
  ]

  return (
    <WebPageTemplate>
      <Title>PokeQuiz</Title>
      <div ref={ref}>{isWinner ? <Result pokemon={pokemon} isRevealed={isRevealed} /> : <h2>Escolha o pokemon</h2>}</div>
      <PokemonGrid actualItem={pokemon} labels={legends} items={pokemons} />

      {!isRevealed && <TextField
        ref={inputRef}
        sx={
          {
            margin: '10px 0',
            '& .MuiInputBase-input': {
              fontSize: '40px',
              fontWeight: 'bold',
              outline: 'none',
              textAlign: 'center'
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
        onChange={handleChange}
        onKeyDown={(e) => e.key === 'Enter' && handleClick(e)}
        placeholder="Digite o nome do Pokemon"
        name="quiz"
        autoComplete="off"
      />}

      {isTipsActive && (
        <div style={{ display: 'flex', gap: 10, margin: "15px 0" }}>
          <PokemonCryButton actualItem={pokemon} />
        </div>
      )}

      <div style={{ display: 'flex', gap: 10, marginTop: "15px" }}>
        <AwesomeButton disabled={isRevealed} type="primary" onPress={handleClick}>Buscar Pokemon</AwesomeButton>
        <AwesomeButton type="secondary" onPress={() => {
          setActiveTips(true)
        }}>Dicas</AwesomeButton>
        <AwesomeButton type="secondary" onPress={() => {
          setIsRevealed(true)
          setIsWinner(true)
          setPokemons([...pokemons, pokemon])
        }}>Revelar</AwesomeButton>
      </div>
    </WebPageTemplate>
  )
}