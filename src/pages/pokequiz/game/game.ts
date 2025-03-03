import arrowDown from '@/assets/arrow-down.png'
import arrowUp from '@/assets/arrow-up.png'
import { Pokemon } from './constants/interfaces'
import { CurrentPokemonStats, PokemonType } from './constants/enum'
import { getDatabase, setDatabase } from '../utils/localstorage'

export const isNumber = (value: any) => typeof value === 'number'

const comparePokemonValues = <K extends keyof Pokemon>(
  pokemon: Pokemon,
  currentValue: number,
  key: K
) => {

  if (!isNumber(currentValue)) {
    return CurrentPokemonStats.EQUAL
  }

  if ((pokemon[key] as number) > currentValue) {
    return CurrentPokemonStats.GREATER
  }

  if ((pokemon[key] as number) < currentValue) {
    return CurrentPokemonStats.SMALLER
  }

  return CurrentPokemonStats.EQUAL
}

export const getBackgroundImage = (pokemon: Pokemon, currentValue: number, key: string) => {
  const comparison = comparePokemonValues(pokemon, currentValue, key as keyof Pokemon)

  const backgroundImage = {
    GREATER: `url(${arrowUp})`,
    SMALLER: `url(${arrowDown})`,
    EQUAL: ''
  }

  return backgroundImage[comparison]
}

export const getSpanMargin = (pokemon: Pokemon, currentValue: number, key: string) => {
  const comparison = comparePokemonValues(pokemon, currentValue, key as keyof Pokemon)

  const spanMargin = {
    GREATER: '35px 0 0 0',
    SMALLER: '0 0 35px 0',
    EQUAL: '0'
  }

  return spanMargin[comparison]
}

export const getPortugueseType = (value: string) => {
  return PokemonType[value.toUpperCase() as keyof typeof PokemonType]
}

// cria funcao randomica que retorna um numero entre 0 e 151
const randomPokemon = () => {
  return Math.floor(Math.random() * 151)
}

const fetchPokemon = async (number: number) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${number}`);
  const pokemonData = await response.json();

  const speciesResponse = await fetch(pokemonData?.species?.url);
  const speciesData = await speciesResponse.json();

  const evolutionResponse = await fetch(speciesData?.evolution_chain?.url);
  const evolutionData = await evolutionResponse.json();

  return {
    ...pokemonData,
    species: {
      ...speciesData,
      evolution_chain: {
        ...evolutionData
      }
    }
  }
}

const fetchPokemons = async () => {
  const numbers = Array.from({ length: 151 }, (_, i) => i + 1)

  const fetchedPokemons = await Promise.all(
    numbers.map((number) => fetchPokemon(number))
  )

  return fetchedPokemons
}


const getStage = (
  evolutions: any,
  name: any,
  stage = 0): string | number | null => {

  if (evolutions.species.name === name) {
    return stage === 0 ? 0 : stage
  }

  for (const evolution of evolutions.evolves_to) {
    const result: string | number | null = getStage(evolution, name, stage + 1)
    if (result !== null) return result
  }

  return null
}

const mapping = (data: any) => {
  return data.map((item: any) => {

    const stage = getStage(item.species.evolution_chain.chain, item.name)

    return {
      name: item.name,
      weight: item.weight / 10,
      number: item.id,
      cry: item.cries.latest,
      image: item.sprites.other['official-artwork'].front_default,
      type1: item.types[0].type.name,
      type2: item.types[1]?.type.name || '-',
      height: item.height / 10,
      sprite: item?.sprites?.front_default,
      habitat: item.species.habitat.name,
      color: item.species.color.name,
      stage,
      text: item.species.flavor_text_entries
        .find((entry: any) => entry.language.name === 'en')?.flavor_text
    }
  })
}

export const initApplication = async () => {
  const database = getDatabase()
  if (!database) {
    const pokemons = await fetchPokemons()
    setDatabase(mapping(pokemons))
    return mapping(pokemons)
  }
  return database
}

const getPokemon = async (name: any) => {
  const value = name ? name : randomPokemon()
  const database = await initApplication()
  return database.find(
    (poke: any) =>
      poke.number === parseInt(value)
      || poke.name === value)
}

export const getPokemonData = async (name = null) => {
  return await getPokemon(name)
}