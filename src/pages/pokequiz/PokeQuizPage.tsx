import { WebPageTemplate } from "@/templates/webpage/WebPageTools"
import { Button } from "@mui/material"
import { useEffect, useState } from "react"
import translate from "translate"
import arrowDown from '@/assets/arrow-down.png'
import arrowUp from '@/assets/arrow-up.png'
import { uhull } from "./confeti"


const Result = ({ pokemon }: any) => {
  return (
    <div>
      <h2>Parabéns! Você acertou!</h2>
      <p>{pokemon.text}</p>
      <img src={pokemon.image} alt={pokemon.name} />
    </div>
  )
}

export const PokeQuizPage = () => {

  const [pokemon, setPokemon] = useState<any>(null)
  const [pokemons, setPokemons] = useState<any>([])
  const [actualPokemon, setActualPokemon] = useState<any>('')
  const [isWinner, setIsWinner] = useState(false)

  useEffect(() => {
    pokemonData().then((data) => setPokemon(data))
  }, [])

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

  // pega valores de tipo 1, tipo 2, nome, imagem, peso, altura, habitate cor do pokemon
  const pokemonData = async (name = null) => {
    const response = await getPokemon(name)
    console.log(response)
    const species = await fetch(response.species.url)
    const speciesData = await species.json()

    const actualText = speciesData.flavor_text_entries.filter(
      (entry: any) =>
        entry.language.name === 'en')[0].flavor_text.replace(/\n/g, ' ').replace(/\f/g, ' ')


    translate.engine = 'google';
    const text = await translate(actualText, { from: 'en', to: 'pt' });
    const habitat = await translate(speciesData.habitat.name, { from: 'en', to: 'pt' });
    const color = await translate(speciesData.color.name, { from: 'en', to: 'pt' });
    const result = {
      name: response.name,
      weight: response.weight / 100,
      number: response.order,
      image: response.sprites.other['official-artwork'].front_default,
      type1: response.types[0].type.name,
      type2: response.types[1]?.type.name || '-',
      height: response.height / 100,
      habitat,
      color,
      sprite: response.sprites.front_default,
      text
    }

    return result
  }


  const handleClick = async (event: any) => {
    event.preventDefault()
    if (actualPokemon === pokemon.name) {
      setIsWinner(true)
      uhull()
    }
    const newPokemon = await pokemonData(actualPokemon)
    setPokemons([...pokemons, newPokemon])

  }

  const handleChange = (event: any) => {
    event.preventDefault()
    const { value } = event.target
    setActualPokemon(value)
  }

  const styleGridItem = {
    aspectRatio: 1 / 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid #ccc',
    backgroundColor: 'green',
    fontSize: '20px',
    borderRadius: '5px',
  }

  const getBackgroundColor = (actualValue: any, key: string) => {
    return actualValue === pokemon[key] ? 'green' : 'red'
  }

  const gridContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: 10,
  }

  const getBackgroundIcon = (actualValue: number, key: string) => {
    if (actualValue > pokemon[key]) {
      return `url(${arrowDown})`
    }

    if (actualValue < pokemon[key]) {
      return `url(${arrowUp})`
    }

    return 'green'
  }

  const getBackgroundSpan = (actualValue: number, key: string) => {
    if (actualValue > pokemon[key]) {
      return {
        fontWeight: 'bold',
        color: 'red',
        backgroundColor: 'white',
        marginBottom: '25px',
      }
    }

    if (actualValue < pokemon[key]) {
      return {
        fontWeight: 'bold',
        color: 'red',
        backgroundColor: 'white',
        marginTop: '25px',
      }
    }

    return {}
  }

  const getBackgroundBG = (actualValue: number, key: string) => {
    if (actualValue > pokemon[key]) {
      return {
        fontWeight: 'bold',
        color: 'red',
        backgroundColor: 'red',
        marginBottom: '25px',
      }
    }

    if (actualValue < pokemon[key]) {
      return {
        fontWeight: 'bold',
        color: 'red',
        backgroundColor: 'red',
        marginTop: '25px',
      }
    }

    return {}
  }

  return (
    <WebPageTemplate>
      <h1 style={{ marginTop: '20px', marginBottom: '20px' }}>PokeQuiz</h1>
      <ul style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {pokemons.map((poke: any) => (
          <li key={poke.name} style={gridContainerStyle}>
            <div style={{ ...styleGridItem, backgroundColor: 'white' }}><img src={poke.sprite} /></div>
            <div style={{ ...styleGridItem, textTransform: 'uppercase', backgroundColor: getBackgroundColor(poke.type1, 'type1') }}>{poke.type1}</div>
            <div style={{ ...styleGridItem, textTransform: 'uppercase', backgroundColor: getBackgroundColor(poke.type2, 'type2') }}>{poke.type2 || '-'}</div>
            <div style={{ ...styleGridItem, backgroundColor: getBackgroundColor(poke.habitat, 'habitat') }}>{poke.habitat}</div>
            <div style={{ ...styleGridItem, backgroundColor: getBackgroundColor(poke.color, 'color') }}>{poke.color}</div>
            <div style={{
              ...styleGridItem,
              backgroundImage: getBackgroundIcon(poke.height, 'height'),
              backgroundSize: 'cover',
              backgroundColor: getBackgroundBG(poke.height, 'height').backgroundColor ? getBackgroundBG(poke.height, 'height').backgroundColor : 'green'
            }}><span style={getBackgroundSpan(poke.height, 'height')}>{poke.height}m</span></div>
            <div style={{
              ...styleGridItem,
              backgroundImage: getBackgroundIcon(poke.weight, 'weight'),
              backgroundSize: 'cover',
              backgroundColor: getBackgroundBG(poke.weight, 'weight').backgroundColor ? getBackgroundBG(poke.height, 'height').backgroundColor : 'green'
            }}><span style={getBackgroundSpan(poke.weight, 'weight')}>{poke.weight}kg</span></div>
          </li>
        ))}
      </ul>
      {isWinner ? <Result pokemon={pokemon} /> : <h2>Escolha o pokemon</h2>}
      <input style={{
        fontSize: '35px',
        marginTop: '20px',
        marginBottom: '20px',
        borderRadius: '5px',
        padding: '10px',
      }} type="text" name="quiz" onChange={handleChange} placeholder="Digite o nome do pokemon" />
      <Button color="primary" variant="contained" onClick={handleClick}>Enviar</Button>
    </WebPageTemplate >
  )
}