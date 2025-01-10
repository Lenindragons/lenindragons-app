import { formatDate } from "@/helpers/format-date"

const isPenalized = (player: any) =>
  player.deck.name.toLowerCase().includes('não compareceu')

function getPoints(player: any, challengeType: string) {
  const weight = challengeType === 'special' ? 3 : 1

  if (isPenalized(player)) {
    return -1
  }

  switch (player.place) {
    case '1':
      return 5 * weight
    case '2':
      return 4 * weight
    case '3':
      return 3 * weight
    case '4':
      return 2 * weight
    default:
      return 1 * weight
  }
}

const applyAchievements = (achievements: any[], points: number) => {
  if (achievements.length === 0) return points

  let totalPoints = 0
  achievements.forEach((achievement: any) => {
    if (achievement.type === 'multiply') {
      totalPoints = points * parseInt(achievement?.points)
    }

    if (achievement.type === 'add') {
      totalPoints = points + parseInt(achievement?.points)
    }

    if (achievement.type === 'remove') {
      totalPoints = points - parseInt(achievement?.points)
    }
  })

  return totalPoints
}

export const getRanking = (challenges: any[], firebasePlayers: any[]) => {
  const filtered = challenges.filter(
    (challenge: { challenge: any }) => challenge.challenge
  )
  if (!filtered.length) return []

  const players = filtered.reduce(
    (acc: any[], challenge: { challenge: { result: any[] }, dates: any, type: string }) => {
      challenge.challenge.result.forEach(
        (player: { name: any; place: any; id: string }, foreachIndex: any) => {
          const index = acc.findIndex(
            (p: { name: any }) => p.name === player.name
          )

          const challengeDate = formatDate(challenge?.dates[0].startDate.toDate())
          const achievements = firebasePlayers.find(fbPlayer => fbPlayer.id === player.id)?.achievements || []
          const playerAchievements = achievements.filter((c: any) => {
            return formatDate(c?.achievementDate.toDate()) === challengeDate
          })

          const dayPoints = getPoints(player, challenge?.type || '')
          const total = applyAchievements(playerAchievements, dayPoints)

          if (index === -1) {
            acc.push({
              ...player,
              points: total,
              playerId: player.id,
              id: foreachIndex,
            })
          } else {
            acc[index].points += total
          }
        }
      )
      return acc
    },
    []
  )

  return players
    .sort(
      (
        a: { points: number; name: string },
        b: { points: number; name: string }
      ) => b.points - a.points || a.name.localeCompare(b.name)
    )
    .map(
      (
        player: {
          id: string
          name: any
          points: any
          email: string
          playerId: string
        },
        i: number
      ) => ({
        id: i,
        place: i + 1,
        name: player.name,
        email: player.email,
        points: player.points,
        playerId: player.playerId,
      })
    )
}
