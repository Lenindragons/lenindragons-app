const DeckListHistory = ({ challenges = [], playerId }: any) => {

  if (!challenges.length) {
    return null
  }

  const challengesHistory = challenges?.filter((challenge: any) =>
    challenge.challenge?.result?.flat()?.some((history: any) => history.id === playerId))

  const challengesHistoryMapped = challengesHistory.map((history: any) => {
    return {
      id: history.id,
      date: history?.dates[0]?.startDate?.toDate(),
      deck: history?.challenge?.result?.flat()?.find((player: any) => player.id === playerId)?.deck
    }
  })

  return <>{
    challengesHistoryMapped
      ?.sort((a: any, b: any) => b.date - a.date)
      ?.map((history: any) => (
        <div style={{ display: 'flex', marginBottom: '10px' }}>
          <div style={{
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '5px 0 0 5px',
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
            color: 'white'
          }}>
            {history?.deck?.icons?.map((icon: any) =>
              (<img src={icon?.url} width={50} height={50} alt={icon?.name} />)
            )}
          </div>
          <div style={{
            flexGrow: 1,
            padding: '10px',
            border: '1px solid #ccc',
            borderLeft: 'none',
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
            gap: 3,
            borderRadius: '0 5px 5px 0',
          }}>
            <strong>{history?.deck?.name}</strong>
          </div>
        </div >
      ))
  }</>
}

export default DeckListHistory
