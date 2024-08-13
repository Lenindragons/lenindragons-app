/* eslint-disable @typescript-eslint/no-redeclare */
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Timestamp } from 'firebase/firestore'

export const getTimeStampInMiliseconds = (timestamp: Timestamp) => {
  if (timestamp === null || timestamp === undefined) return 0
  const { seconds, nanoseconds } = timestamp
  const timestampMiliseconds = seconds * 1000 + nanoseconds / 1000000
  return new Date(timestampMiliseconds)
}

export const isTimestamp = (value: any): value is Timestamp => {
  return (
    value instanceof Timestamp ||
    (value &&
      typeof value === 'object' &&
      typeof value.seconds === 'number' &&
      typeof value.nanoseconds === 'number')
  )
}

export const getDate = (
  timestamp: Timestamp | string,
  formatDate = 'dd/MM/yyyy'
) => {
  if (timestamp) {
    const date = isTimestamp(timestamp)
      ? getTimeStampInMiliseconds(timestamp as Timestamp)
      : new Date(timestamp as string)
    return format(date, formatDate, { locale: ptBR })
  }
  return ''
}

export interface UserMetadata {
  createdAt: string
  creationTime: string
  lastLoginAt: string
  lastSignInTime: string
}

export const formatUserMetadata = (metadata: UserMetadata) => {
  const formatDate = (timestamp: string) => {
    const date = new Date(parseInt(timestamp, 10))
    return date.toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    })
  }

  return {
    createdAt: formatDate(metadata.createdAt),
    creationTime: new Date(metadata.creationTime).toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }),
    lastLoginAt: formatDate(metadata.lastLoginAt),
    lastSignInTime: new Date(metadata.lastSignInTime).toLocaleDateString(
      'pt-BR',
      {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      }
    ),
  }
}
