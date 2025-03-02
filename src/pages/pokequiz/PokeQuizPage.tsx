import { WebPageTemplate } from "@/templates/webpage/WebPageTools"
import { TextField } from "@mui/material"
import { useEffect, useRef, useState } from "react"
import { uhull } from "./utils/confeti"
import { Result } from "./components/result/Result"
import { styled } from "styled-components"
import { AwesomeButton } from "react-awesome-button"
import { getPokemonData } from "./game/game"
import { PokemonGrid } from "./components/pokemon-grid/PokemonGrid"

export const PokeQuizPage = () => {

  const [pokemon, setPokemon] = useState<any>(null)
  const [pokemons, setPokemons] = useState<any>([])
  const [actualPokemon, setActualPokemon] = useState<any>('')
  const [isWinner, setIsWinner] = useState(false)
  const ref = useRef<any>(null)

  useEffect(() => {
    getPokemonData().then((data) => setPokemon(data))
  }, [])

  const handleClick = async (event: any) => {
    event.preventDefault()
    if (actualPokemon === pokemon.name) {
      setIsWinner(true)
      uhull()
    }
    const newPokemon = await getPokemonData(actualPokemon)
    setPokemons([...pokemons, newPokemon])
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
      {isWinner ? <Result pokemon={pokemon} ref={ref} /> : <h2>Escolha o pokemon</h2>}
      <PokemonGrid actualItem={pokemon} labels={legends} items={pokemons} />

      <TextField
        style={{ margin: '20px 0' }}
        onChange={handleChange}
        placeholder="Digite o nome do Pokemon"
        name="quiz"
      />
      <AwesomeButton type="primary" onPress={handleClick}>Buscar Pokemon</AwesomeButton>
    </WebPageTemplate >
  )
}