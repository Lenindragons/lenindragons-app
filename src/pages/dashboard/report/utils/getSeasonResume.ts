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

    const result = grouped[key].reduce(
      (acc: any, challenge: any) => {
        const challengeResultLength = challenge.challenge.result.length

        const normalValue =
          challenge.type !== 'special'
            ? challenge?.season?.values?.season?.normalChallenge || 25
            : challenge?.season?.values?.season?.specialChallenge || 35

        const normalPlayerValue =
          challenge.type !== 'special'
            ? challenge?.season?.values?.season?.normalChallengeTop || 5
            : challenge?.season?.values?.season?.specialChallengeTop || 5

        acc.values += challengeResultLength * normalValue
        acc.playersValues += challengeResultLength * normalPlayerValue

        return acc
      },
      { values: 0, playersValues: 0 }
    )

    return {
      id: grouped[key][0].season.id,
      name: key.split('-').join(' '),
      image: grouped[key][0].season.image.url,
      startDate: grouped[key][0].season.dates[0].startDate,
      endDate: grouped[key][0].season.dates[0].endDate,
      challenges: grouped[key],
      totalPlayers,
      count: grouped[key].length,
      values: result.values,
      playersValues: result.playersValues,
      seasonChallengeValues: grouped[key][0].season.values,
      specialEvents: grouped[key].filter(
        (group: any) => group.type === 'special'
      ).length,
    }
  })
}
