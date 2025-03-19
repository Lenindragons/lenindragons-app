import { UserTypes } from "@/types/User"

const { ADMIN, ORGANIZER, JUDGE, PLAYER } = UserTypes

export const allowedAll = [ADMIN, ORGANIZER, JUDGE, PLAYER]
export const allowedAdminOrganizerJudge = [ADMIN, ORGANIZER, JUDGE]
export const allowedAdminOrganizer = [ADMIN, ORGANIZER]
export const allowedAdminJudge = [ADMIN, JUDGE]
export const allowedAdmin = [ADMIN]