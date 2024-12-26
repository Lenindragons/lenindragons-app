export const getFrequency = (challenges: any) => {
  return challenges
    .map((challenge: any) => challenge.challenge.result)
    .flat()
    .reduce((acc: any[], player: any) => {
      const index = acc.findIndex((p) => p.name === player.name)
      if (index === -1) {
        acc.push({ name: player.name, count: 1 })
      } else {
        acc[index].count += 1
      }
      return acc
    }, [])
    .sort(
      (
        a: { count: number; name: string },
        b: { count: number; name: string }
      ) => b.count - a.count || a.name.localeCompare(b.name)
    )
}
