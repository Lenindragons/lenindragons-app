/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-unsafe-optional-chaining */
import { getRanking } from '@/pages/ranking/components/ranking/getRanking'
import { getDocChallengesBySeasonId } from '@/services/challenge'

const getTopPlayers = (value: number) => {
  if (value <= 200) {
    return 4
  }

  if (value <= 400 && value > 200) {
    return 6
  }

  return 8
}

export const getSeasonResume = async (seasonId: string) => {
  const season = await getDocChallengesBySeasonId(seasonId)

  const mappedSeason = season.map((challenges) => ({
    totalPlayers: challenges.challenge.result.length,
  }))
  const ranking = getRanking(season)
  const totalPlayers = mappedSeason.reduce(
    (acc, cur) => acc + cur.totalPlayers,
    0
  )

  const total = totalPlayers * 5
  const topPlayers = getTopPlayers(total)
  const percentage = {
    4: { 1: 0.5, 2: 0.25, 3: 0.125, 4: 0.125 },
    6: { 1: 0.4, 2: 0.2, 3: 0.1, 4: 0.1, 5: 0.1, 6: 0.1 },
    8: {
      1: 0.35,
      2: 0.15,
      3: 0.1,
      4: 0.1,
      5: 0.09,
      6: 0.09,
      7: 0.08,
      8: 0.08,
    },
  } as any

  return {
    total,
    season: season[0].season,
    ranking: ranking.map((player: any) => {
      if (player.id < topPlayers) {
        const score = total * percentage[topPlayers][player.place]
        return {
          email: player.email,
          place: player.place,
          score,
        }
      }
      return { email: player.email, score: 0, place: player.place }
    }),
  }
}
