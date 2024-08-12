import { createRandomNumberGenerator } from '@mui/x-data-grid/internals'

function getPoints(place) {
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

export const getRanking = (challenges) => {
  const filtered = challenges.filter((challenge) => challenge.challenge)
  if (!filtered.length) return []

  const players = filtered.reduce((acc, challenge) => {
    challenge.challenge.result.forEach((player, foreachIndex) => {
      const index = acc.findIndex((p) => p.name === player.name)
      if (index === -1) {
        acc.push({
          ...player,
          points: getPoints(player.place),
          id: foreachIndex,
        })
      } else {
        acc[index].points += getPoints(player.place)
      }
    })
    return acc
  }, [])

  return players.sort((a, b) => b.points - a.points)
}
