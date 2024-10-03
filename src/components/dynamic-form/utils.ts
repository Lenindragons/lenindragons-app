/* eslint-disable no-restricted-syntax */
import { UseFormSetError } from 'react-hook-form'
import { Pokemon } from '../../pages/challenge/hooks/player-list/types'
import { FormValues, PlayerItemDynamyc } from './types'

export const mappingPlayers = (players: any) => {
  return players.map((value: PlayerItemDynamyc) => ({
    place: value.place,
    name: value.player.name,
    id: value.player.id,
    email: value.player.email,
    wins: value.wins,
    looses: value.looses,
    ties: value.ties,
    deck: value.deck,
  }))
}

export const validateFields = (
  fields: {
    place: number
    name: string
    wins: number
    looses: number
    ties: number
    deck: Pokemon[]
  }[],
  setError: UseFormSetError<FormValues>
) => {
  const errorObject = { type: 'manual', message: 'Este campo é obrigatório' }
  for (const [index, field] of fields.entries()) {
    if (
      !field.place ||
      !field.name ||
      !field.wins ||
      !field.looses ||
      !field.ties ||
      !field.deck
    ) {
      if (!field.place) {
        setError(`players.${index}.place`, errorObject)
      }
      if (!field.name) {
        setError(`players.${index}.player.name`, errorObject)
      }
      if (!field.wins) {
        setError(`players.${index}.wins`, errorObject)
      }
      if (!field.looses) {
        setError(`players.${index}.looses`, errorObject)
      }
      if (!field.ties) {
        setError(`players.${index}.ties`, errorObject)
      }
      if (!field.deck) {
        setError(`players.${index}.deck`, errorObject)
      }
      return false
    }
  }
  return true
}
