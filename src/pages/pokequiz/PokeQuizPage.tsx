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
import { Avatar } from "@mui/material"
import pokemonDay from "@/assets/pokemon-day-2025.png"

export const PokeQuizPage = () => {

  const [pokemon, setPokemon] = useState<any>(null)
  const [pokemons, setPokemons] = useState<any>([])
  const [actualPokemon, setActualPokemon] = useState<any>('')
  const [isWinner, setIsWinner] = useState(false)
  const [isRevealed, setIsRevealed] = useState(false)
  const [isTipsActive, setActiveTips] = useState(false)
  const [restarted, setRestarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const refLogo = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const catchPokemon = async () => {
      const catched = await getPokemonData()
      setPokemon(catched)
    }
    catchPokemon()
  }, [restarted])

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

  const scrollToLogo = () => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' })
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
    '1º Tipo',
    '2º Tipo',
    'Habitat',
    'Cor',
    'Estágio',
    'Tamanho',
    'Peso',
  ]

  return (
    <WebPageTemplate>
      <Title>PokéQuiz</Title>
      <Avatar
        ref={refLogo}
        src={pokemonDay}
        alt="Pokemon Day 2025"
        sx={{
          width: 100, height: 100, marginBottom: '35px'
        }} />
      {/* <PlayerTracking /> */}
      <div ref={ref}>{isWinner && <Result pokemon={pokemon} isRevealed={isRevealed} />}</div>
      <PokemonGrid actualItem={pokemon} labels={legends} items={pokemons} />

      {!isRevealed && <PokemonAutocomplete
        onKeyDown={(e: any) => e.key === 'Enter' && handleClick(e)}
        onChange={handleChange}
      />}

      {isTipsActive && (
        <div style={{ display: 'flex', gap: 10, margin: "15px 0" }}>
          <PokemonCryButton actualItem={pokemon} />
        </div>
      )}
      {pokemon && <div ref={inputRef} style={{ display: 'flex', gap: 10, marginTop: "15px" }}>
        <AwesomeButton
          disabled={isRevealed}
          type="primary"
          onPress={handleClick}>Buscar Pokemon</AwesomeButton>
        <AwesomeButton type="twitter" onPress={() => {
          setActiveTips(true)
        }}>Dicas</AwesomeButton>
        <AwesomeButton type="secondary" onPress={() => {
          setIsRevealed(true)
          setIsWinner(true)
          setPokemons([...pokemons, pokemon])
          scrollToTop()
        }}>Revelar</AwesomeButton>
        <AwesomeButton type="danger" onPress={() => {
          setPokemons([])
          setActualPokemon('')
          setIsWinner(false)
          setIsRevealed(false)
          setActiveTips(false)
          setRestarted(!restarted)
          scrollToLogo()
        }}>Reiniciar Jogo</AwesomeButton>
      </div>}
    </WebPageTemplate>
  )
}