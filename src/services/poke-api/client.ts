/* eslint-disable @typescript-eslint/no-shadow */
import axios from 'axios'

export const client = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
})

export const getPokemons = async () => {
  const db = localStorage.getItem('pokemons')

  if (db) {
    return JSON.parse(db).map((pokemon: any) => ({
      name: pokemon.name,
      url: pokemon.url,
    }))
  }

  const response = await client.get(`/pokemon`, {
    params: {
      limit: 2000,
      offset: 0,
    },
  })

  const urls = response.data.results.map((pokemon: any) => pokemon.url)
  const requests = urls.map((url: string) => client.get(url))

  const responses = await axios.all(requests)

  const database = responses.map((response: any) => ({
    name: response.data.name,
    url: response.data.sprites.front_default,
  }))

  localStorage.setItem('pokemons', JSON.stringify(database))
  return database
}
