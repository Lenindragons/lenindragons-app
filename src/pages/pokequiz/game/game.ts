import arrowDown from '@/assets/arrow-down.png'
import arrowUp from '@/assets/arrow-up.png'
import { Pokemon } from './constants/interfaces'
import { CurrentPokemonStats, PokemonType } from './constants/enum'
import translate from "translate"
import { HabitatDictionary } from './constants/constants'

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

// retorna um pokemon da poke api
const getPokemon = async (name: any) => {
  const value = name ? name : randomPokemon()
  const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${value}`)
  return pokemon.json()
}

export const getPokemonData = async (name = null) => {
  const response = await getPokemon(name)

  const species = await fetch(response.species.url)
  const speciesData = await species.json()

  const actualText = speciesData.flavor_text_entries.filter(
    (entry: any) =>
      entry.language.name === 'en')[0].flavor_text.replace(/\n/g, ' ').replace(/\f/g, ' ')


  translate.engine = 'google'
  const text = await translate(actualText, { from: 'en', to: 'pt' })

  const habitatName = HabitatDictionary[speciesData.habitat.name]

  const habitat = habitatName
    ? habitatName
    : await translate(speciesData.habitat.name, { from: 'en', to: 'pt' })

  const color = await translate(speciesData.color.name, { from: 'en', to: 'pt' })

  const result = {
    name: response.name,
    weight: response.weight / 10,
    number: response.order,
    image: response.sprites.other['official-artwork'].front_default,
    type1: response.types[0].type.name,
    type2: response.types[1]?.type.name || '-',
    height: response.height / 10,
    habitat,
    color,
    sprite: response.sprites.front_default,
    text
  }

  return result
}