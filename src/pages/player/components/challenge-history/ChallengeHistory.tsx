import { formatDate } from "@/helpers/format-date"
import { getPlaceBall } from "@/utils/getPlaceBall"
import { Link } from "react-router-dom"
import { PaginateItems } from "../paginate-items"

const ChallengeHistory = ({ challenges = [], playerId }: any) => {

  if (!challenges.length) {
    return null
  }

  const challengesHistory = challenges?.filter((challenge: any) =>
    challenge.challenge?.result?.flat()?.some((history: any) => history.id === playerId))

  const challengesHistoryMapped = challengesHistory
    .sort((a: any, b: any) => b.dates[0].startDate.toDate() - a.dates[0].startDate.toDate())
    .map((history: any) => {

      let name = history?.name

      if (name === "default" || !name) {
        name = history?.season?.name
      }

      return {
        name,
        date: formatDate(history?.dates[0]?.startDate?.toDate()),
        place: history?.challenge?.result?.flat()?.find((player: any) => player.id === playerId)?.place,
        id: history.id
      }
    })

  const challengesHistoryItems = challengesHistoryMapped?.map((playerHistory: { date: string, place: number, id: string, name: string }) => (

    <div style={{ display: 'flex', marginBottom: '10px', width: '100%', height: '50px' }}>
      <div style={{
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px 0 0 5px',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        color: 'white'
      }}>
        <Link style={{ color: 'black' }} to={`/challenge/${playerHistory.id}`}>
          {playerHistory.date}
        </Link>
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
      }}> {getPlaceBall(playerHistory.place.toString())} <strong>{playerHistory.place}º lugar (em {playerHistory?.name})</strong></div>
    </div >
  )
  )

  return (
    <PaginateItems items={challengesHistoryItems} itemsPerPage={5} />
  )

}

export default ChallengeHistory
