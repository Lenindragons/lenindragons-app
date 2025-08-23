import { getRankingBySeason } from './getRanking'
import * as challengeService from '@/services/challenge'
import * as playerService from '@/services/players'

// Mocks automáticos dos módulos
vi.mock('@/services/challenge')
vi.mock('@/services/players')

describe('getRankingBySeason', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should return players ranked by points and achievements', async () => {
    const seasonId = 's1'

    const mockChallenges = [
      {
        id: 'c1',
        seasonId: 's1',
        challenge: {
          result: [
            { id: 'p1', name: 'Alice', place: '1' }, // 5
            { id: 'p2', name: 'Bob', place: '2' } // 4
          ]
        }
      },
      {
        id: 'c2',
        seasonId: 's2', // Deve ser ignorado
        challenge: {
          result: [{ id: 'p1', name: 'Alice', place: '1' }]
        }
      }
    ]

    const mockPlayers = [
      {
        id: 'p1',
        name: 'Alice',
        email: 'alice@email.com',
        achievements: [
          { season: 's1', points: '5' }, // 5
          { season: 's2', points: '100' }
        ]
      },
      {
        id: 'p2',
        name: 'Bob',
        email: 'bob@email.com',
        achievements: []
      },
      {
        id: 'p3',
        name: 'Carol',
        email: 'carol@email.com',
        achievements: []
      }
    ]

    vi.mocked(challengeService.getAllChallenge).mockResolvedValue(mockChallenges)
    vi.mocked(playerService.getPlayers).mockResolvedValue(mockPlayers)

    const result = await getRankingBySeason(seasonId)

    expect(result).toEqual([
      {
        id: 0,
        place: 1,
        name: 'Alice',
        email: 'alice@email.com',
        points: 10,
        playerId: 'p1'
      },
      {
        id: 1,
        place: 2,
        name: 'Bob',
        email: 'bob@email.com',
        points: 4,
        playerId: 'p2'
      }
    ])

    expect(challengeService.getAllChallenge).toHaveBeenCalled()
    expect(playerService.getPlayers).toHaveBeenCalled()
  })

  it('should return empty list when no player has points', async () => {
    vi.mocked(challengeService.getAllChallenge).mockResolvedValue([])
    vi.mocked(playerService.getPlayers).mockResolvedValue([])

    const result = await getRankingBySeason('s1')
    expect(result).toEqual([])
  })

  it('should order players with same points by name', async () => {
    const seasonId = 's1'

    const mockChallenges = [
      {
        seasonId: 's1',
        challenge: {
          result: [
            { id: 'p1', name: 'Zoe', place: '1' },
            { id: 'p2', name: 'Anna', place: '2' }
          ]
        }
      }
    ]

    const mockPlayers = [
      { id: 'p1', name: 'Zoe', email: 'z@email.com', achievements: [] },
      { id: 'p2', name: 'Anna', email: 'a@email.com', achievements: [] }
    ]

    vi.mocked(challengeService.getAllChallenge).mockResolvedValue(mockChallenges)
    vi.mocked(playerService.getPlayers).mockResolvedValue(mockPlayers)

    const result = await getRankingBySeason(seasonId)

    expect(result[0].name).toBe('Zoe')
    expect(result[1].name).toBe('Anna')
  })
})
