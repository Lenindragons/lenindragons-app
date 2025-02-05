import { Timestamp } from "firebase/firestore"

export enum EventStatus {
  SCHEDULED = 'Agendado',
  IN_PROGRESS = 'Em andamento',
  FINISHED = 'Encerrado'
}

export const getChallengeStatus = (startDate: Timestamp, endDate: Timestamp) => {
  const now = new Date()
  const eventEndDate = endDate.toDate()
  const eventStartDate = startDate.toDate()
  if (eventEndDate < now) {
    return EventStatus.FINISHED
  }

  if (eventStartDate > now) {
    return EventStatus.SCHEDULED
  }

  return EventStatus.IN_PROGRESS
}