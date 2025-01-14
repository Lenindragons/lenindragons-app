export const getSeasonChallenges = (challenges: any) => {
  if (!challenges || !challenges.length) {
    return []
  }

  return challenges
    .filter((challenge: any) => challenge.season)
    .filter((challenge: any) => challenge.season.type === 'season')
}

export const filterByPlayerName = (obj: any, index: number, self: any) => {
  const normalizedPlayers = JSON.stringify(
    obj.players.map((player: any) =>
      typeof player === "string" ? player : player.name
    ).sort()
  )

  return index === self.findIndex((o: any) => {
    const normalized = JSON.stringify(
      o.players.map((player: any) =>
        typeof player === "string" ? player : player.name
      ).sort()
    )
    return normalized === normalizedPlayers
  })
}

export const filterByPlayerId = (playerId: string) => (match: any) =>
  match?.players?.some((player: any) => player.id === playerId)

export const filterSameMatch = (playerId: string, profileId: string) => (match: any) =>
  match?.players?.some((player: any) => player.id === playerId) &&
  match?.players?.some((player: any) => player.id === profileId)

export const getMatchesByPlayerId = (challenges: any, playerId: string) => {
  if (!challenges || !challenges.length) {
    return []
  }

  const seasonChallenges = getSeasonChallenges(challenges)

  const seasonMatches = seasonChallenges
    .map((challenge: any) => {
      const dates = challenge.dates
      const matches = challenge.matches.map((match: any) => {
        return { ...match, dates }
      })
      return matches
    })

  return seasonMatches
    .flat()
    .filter(filterByPlayerName)
    .filter(filterByPlayerId(playerId))
}

export const getPlayerImageById = (players: any, id: string) => {
  return players.find((player: any) => player.id === id)?.image
}

export const getMatchesWithPlayerId = (challenges: any, playerId: string, profileId: string) => {
  if (!challenges || !challenges.length) {
    return []
  }

  return challenges
    .map((challenge: any) => {
      const date = challenge?.dates[0].startDate
      const matches = challenge?.matches?.map((match: any) => {
        return { ...match, date }
      })

      return matches
    })
    .flat()
    .filter(filterSameMatch(playerId, profileId))
}

export const calculatePerformance = ({ wins, losses, ties }: any) => {
  const totalGames = wins + losses + ties

  if (totalGames === 0) return 50

  const performanceA = ((wins + ties / 2) / totalGames) * 100

  return parseFloat(performanceA.toFixed(2))
}

export const getMatches = (match: any, id: string) => {
  const result = match.players
    .filter((player: any) => player.id !== id)
    .filter((player: any) => player !== 'bye')
  return result
}

export const getResult = (challenges: any, player: any, id: string, callback: any) =>
  getMatchesWithPlayerId(challenges, player.id, id || '')
    .filter(callback).length