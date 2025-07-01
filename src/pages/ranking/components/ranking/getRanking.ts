import { formatDate } from "@/helpers/format-date"
import { getAllChallenge } from "@/services/challenge"
import { getPlayers } from "@/services/players"

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
      totalPoints += points * parseInt(achievement?.points)
    }

    if (achievement.type === 'add') {
      totalPoints += points + parseInt(achievement?.points)
    }

    if (achievement.type === 'remove') {
      totalPoints += points - parseInt(achievement?.points)
    }
  })

  return totalPoints
}

export const getRanking = async (challenges: any[], firebasePlayers: any[]) => {

  const seasonId = challenges[0]?.seasonId
  const allChallenges = await getAllChallenge() || []

  const offMetaWithSettings = allChallenges?.filter(
    (challenge: any) => challenge?.settings?.challenges?.includes(seasonId)
  )

  const newChallenges = [...challenges, ...offMetaWithSettings]

  const filtered = newChallenges.filter(
    (challenge: { challenge: any }) => challenge.challenge
  )
  if (!filtered.length) return []

  const allPlayersWithAchievements = firebasePlayers?.filter(player => player?.achievements?.length > 0)

  const players = filtered.reduce(
    (acc: any[], challenge: { challenge: { result: any[] }, settings: any, dates: any, type: string, seasonId: string }) => {
      challenge.challenge.result.forEach(
        (player: { name: any; place: any; id: string }, foreachIndex: any) => {
          const index = acc.findIndex(
            (p: { name: any }) => p.name === player.name
          )

          const challengeDate = formatDate(challenge?.dates[0].startDate.toDate())
          const achievements = allPlayersWithAchievements.find(fbPlayer => fbPlayer.id === player.id)?.achievements || []
          const playerAchievements = achievements.filter((c: any) => {
            return formatDate(c?.achievementDate.toDate()) === challengeDate
          })

          const hasRankingPoints = challenge.seasonId === seasonId || challenge.settings?.resultPoints
          const hasAchievementsPoints = challenge.seasonId === seasonId || challenge.settings?.achievementsPoints


          const dayPoints = hasRankingPoints ? getPoints(player, challenge?.type || '') : 0
          const total = hasAchievementsPoints ? applyAchievements(playerAchievements, dayPoints) : 0


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

const getPointsByResult = (player: any) => {
  switch (player.place) {
    case '1':
      return 5
    case '2':
      return 4
    case '3':
      return 3
    case '4':
      return 2
    default:
      return 1
  }
}

export const getRankingBySeason = async (seasonId: string) => {
  const challenges = await getAllChallenge()
  console.log('Challenges:', challenges)
  const players = await getPlayers()
  const challengesBySeasonId = challenges.filter((challenge: any) => challenge.seasonId === seasonId)

  const playersWithPoints = players.map((player: any) => {
    const playersChallenge = challengesBySeasonId.filter((challenge: any) => {
      return challenge.challenge.result.some((result: any) => result.id === player.id)
    }).map((challenge: any) => {
      return challenge.challenge.result.find((result: any) => result.id === player.id)
    })

    const challengesPoint = playersChallenge
      .map(result => getPointsByResult(result))
      .reduce((acc: number, cur: number) => acc + cur, 0) || 0

    const achievementsPoints = player?.achievements
      ?.filter((achievement: any) => achievement.season === seasonId)
      ?.map((achievement: any) => parseInt(achievement.points))
      ?.reduce((acc: number, cur: number) => acc + cur, 0) || 0

    return {
      points: challengesPoint + achievementsPoints,
      ...player
    }
  }).filter((player: any) => player.points > 0)

  return playersWithPoints
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
        playerId: player.id,
      })
    ) || []
}