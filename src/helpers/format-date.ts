import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Timestamp } from 'firebase/firestore'

export const getDate = (timestamp: Timestamp) => {
  const { seconds, nanoseconds } = timestamp
  const timestampMiliseconds = seconds * 1000 + nanoseconds / 1000000
  const date = new Date(timestampMiliseconds)
  return format(date, 'dd/MM/yyyy', { locale: ptBR })
}
