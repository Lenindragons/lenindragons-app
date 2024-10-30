export const MatchResume = ({
  players,
  rounds,
}: {
  players: any[]
  rounds: number
}) => {
  console.log({ players })
  if (players.length === 0) {
    return <>No players</>
  }

  return <>MatchResume </>
}
