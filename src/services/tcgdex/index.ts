import { PokemonTCG } from 'pokemon-tcg-sdk-typescript'

export const getCardsByName = async (name: string) => {
  try {
    const response = await PokemonTCG.findCardsByQueries({ q: `name:${name}` })
    const mapped = response.map(card => ({ image: card.images.small, name: card.name }))
    return mapped
  } catch (error: { message: string } | any) {
    console.error("Erro ao buscar cartas:", error.message)
    return { error: "Não foi possível buscar as cartas. Verifique o nome e tente novamente." }
  }
}
