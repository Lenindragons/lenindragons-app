import { WebPageTemplate } from "@/templates/webpage/WebPageTools"
import { useEffect, useRef, useState } from "react"
import { uhull } from "./utils/confeti"
import { Result } from "./components/result/Result"
import { styled } from "styled-components"
import { AwesomeButton } from "react-awesome-button"
import { getPokemonData } from "./game/game"
import { PokemonGrid } from "./components/pokemon-grid/PokemonGrid"
import { PokemonCryButton } from "./components/pokemon-cry-button/PokemonCryButton"
import { PokemonAutocomplete } from "./components/pokemon-autocomplete/PokemonAutoComplete"

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
    const catchPokemon = async () => {
      const catched = await getPokemonData()
      setPokemon(catched)
    }
    catchPokemon()
  }, [])

  const handleClick = async (event: any) => {
    event.preventDefault()
    scrollToBottom()
    if (actualPokemon.toLowerCase() === pokemon.name) {
      setTimeout(() => {
        scrollToTop()
        setIsWinner(true)
        uhull()
      }, 2000)
    }
    const newPokemon = await getPokemonData(actualPokemon.toLowerCase())
    if (newPokemon) {
      setPokemons([...pokemons, newPokemon])
    }
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

  const handleChange = (value: any) => {
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
    'Estágio',
    'Tamanho',
    'Peso',
  ]

  return (
    <WebPageTemplate>
      <Title>PokeQuiz</Title>
      <div ref={ref}>{isWinner ? <Result pokemon={pokemon} isRevealed={isRevealed} /> : <h2>Escolha o pokemon</h2>}</div>
      <PokemonGrid actualItem={pokemon} labels={legends} items={pokemons} />

      {!isRevealed && <PokemonAutocomplete
        ref={inputRef}
        onKeyDown={(e: any) => e.key === 'Enter' && handleClick(e)}
        onChange={handleChange}
      />}


      {isTipsActive && (
        <div style={{ display: 'flex', gap: 10, margin: "15px 0" }}>
          <PokemonCryButton actualItem={pokemon} />
        </div>
      )}
      {pokemon && <div style={{ display: 'flex', gap: 10, marginTop: "15px" }}>
        <AwesomeButton disabled={isRevealed} type="primary" onPress={handleClick}>Buscar Pokemon</AwesomeButton>
        <AwesomeButton type="secondary" onPress={() => {
          setActiveTips(true)
        }}>Dicas</AwesomeButton>
        <AwesomeButton type="secondary" onPress={() => {
          setIsRevealed(true)
          setIsWinner(true)
          setPokemons([...pokemons, pokemon])
        }}>Revelar</AwesomeButton>
      </div>}
    </WebPageTemplate>
  )
}