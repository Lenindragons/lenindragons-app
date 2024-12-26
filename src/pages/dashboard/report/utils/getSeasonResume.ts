export const getSeasonResume = (challenges: any) => {
  const filtered = challenges
    .filter((challenge: any) => challenge.challenge)
    .filter((challenge: any) => ['season'].includes(challenge.season.type))

  const grouped = filtered.reduce((acc: any, challenge: any) => {
    const seasonName = challenge.season.name.split(' ').join('-').toLowerCase()

    if (!acc[seasonName]) {
      acc[seasonName] = []
    }

    acc[seasonName].push(challenge)

    return acc
  }, {}) as any

  return Object.keys(grouped).map((key) => {
    const totalPlayers = grouped[key]
      .map(
        (challenge: { challenge: { result: string | any[] } }) =>
          challenge.challenge.result.length
      )
      .reduce((acc: any, curr: any) => acc + curr, 0)

    const values = grouped[key]
      .map(
        (challenge: { challenge: { result: string | any[] }; type: string }) =>
          challenge.challenge.result.length *
          (challenge.type !== 'special' ? 25 : 35)
      )
      .reduce((acc: any, curr: any) => acc + curr, 0)

    return {
      id: grouped[key][0].season.id,
      name: key.split('-').join(' '),
      image: grouped[key][0].season.image.url,
      startDate: grouped[key][0].season.dates[0].startDate,
      endDate: grouped[key][0].season.dates[0].endDate,
      challenges: grouped[key],
      totalPlayers,
      count: grouped[key].length,
      values,
      seasonChallengeValues: grouped[key][0].season.values,
      specialEvents: grouped[key].filter(
        (group: any) => group.type === 'special'
      ).length,
    }
  })
}
