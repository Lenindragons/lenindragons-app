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

export const getRanking = (challenges: any[]) => {
  const filtered = challenges.filter(
    (challenge: { challenge: any }) => challenge.challenge
  )
  if (!filtered.length) return []

  const players = filtered.reduce(
    (acc: any[], challenge: { challenge: { result: any[] }; type: string }) => {
      challenge.challenge.result.forEach(
        (player: { name: any; place: any; id: string }, foreachIndex: any) => {
          const index = acc.findIndex(
            (p: { name: any }) => p.name === player.name
          )
          if (index === -1) {
            acc.push({
              ...player,
              points: getPoints(player, challenge?.type || ''),
              playerId: player.id,
              id: foreachIndex,
            })
          } else {
            acc[index].points += getPoints(player, challenge?.type || '')
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
