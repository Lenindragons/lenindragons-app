import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Timestamp } from 'firebase/firestore'

export const getTimeStampInMiliseconds = (timestamp: Timestamp) => {
  if (timestamp === null || timestamp === undefined) return 0
  const { seconds, nanoseconds } = timestamp
  const timestampMiliseconds = seconds * 1000 + nanoseconds / 1000000
  return new Date(timestampMiliseconds)
}

export const getDate = (timestamp: Timestamp) => {
  const date = getTimeStampInMiliseconds(timestamp)
  return format(date, 'dd/MM/yyyy', { locale: ptBR })
}
