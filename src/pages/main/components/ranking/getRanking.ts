function getPoints(place: any) {
  switch (place) {
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

export const getRanking = (challenges: any[]) => {
  const filtered = challenges.filter(
    (challenge: { challenge: any }) => challenge.challenge
  )
  if (!filtered.length) return []

  const players = filtered.reduce(
    (acc: any[], challenge: { challenge: { result: any[] } }) => {
      challenge.challenge.result.forEach(
        (player: { name: any; place: any }, foreachIndex: any) => {
          const index = acc.findIndex(
            (p: { name: any }) => p.name === player.name
          )
          if (index === -1) {
            acc.push({
              ...player,
              points: getPoints(player.place),
              id: foreachIndex,
            })
          } else {
            acc[index].points += getPoints(player.place)
          }
        }
      )
      return acc
    },
    []
  )

  return players.sort(
    (a: { points: number }, b: { points: number }) => b.points - a.points
  )
}
