type Player = {
  id: string
  name: string
  score: number
  opponents: string[] // IDs dos oponentes enfrentados
}

type Match = {
  player1: Player
  player2: Player
  result: 'player1' | 'player2' | 'draw'
}

export const pairPlayers = (players: Player[]): Match[] => {
  // Ordenar jogadores por pontuação
  players.sort((a, b) => b.score - a.score)

  const matches: Match[] = []
  for (let i = 0; i < players.length; i += 2) {
    if (i + 1 < players.length) {
      matches.push({
        player1: players[i],
        player2: players[i + 1],
        result: 'draw',
      })
    }
  }
  return matches
}

export const calculateBuchholz = (
  players: Player[]
): { [key: string]: number } => {
  const buchholzScores: { [key: string]: number } = {}

  players.forEach((player) => {
    let buchholz = 0
    player.opponents.forEach((opponentId) => {
      const opponent = players.find((p) => p.id === opponentId)
      if (opponent) {
        buchholz += opponent.score
      }
    })
    buchholzScores[player.id] = buchholz
  })

  return buchholzScores
}

export const rankPlayers = (players: Player[]): Player[] => {
  const buchholzScores = calculateBuchholz(players)

  return players.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score
    }
    return buchholzScores[b.id] - buchholzScores[a.id]
  })
}

const players: Player[] = [
  { id: '1', name: 'Alice', score: 3, opponents: ['2', '3', '4'] },
  { id: '2', name: 'Bob', score: 3, opponents: ['1', '3', '4'] },
  { id: '3', name: 'Charlie', score: 2, opponents: ['1', '2', '4'] },
  { id: '4', name: 'David', score: 1, opponents: ['1', '2', '3'] },
]

const rankedPlayers = rankPlayers(players)
console.log(rankedPlayers)
