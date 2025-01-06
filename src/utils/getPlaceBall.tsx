import MasterBall from '@/assets/masterball.png'
import GreatBall from '@/assets/greatball.png'
import UltraBall from '@/assets/ultraball.png'
import PokeBall from '@/assets/pokeball.png'

export const getBall = (place: string) => {
  const commonStyle = {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  }
  switch (parseInt(place, 10)) {
    case 1:
      return {
        icon: MasterBall,
        style: {
          background: 'linear-gradient(135deg, #6a0dad, #ff69b4, #ffffff)',
          ...commonStyle,
        },
      }
    case 2:
      return {
        icon: UltraBall,
        style: {
          background: 'linear-gradient(to right, #4b4b4b, #ffd700, #f0f0f0)',
          ...commonStyle,
        },
      }
    case 3:
      return {
        icon: GreatBall,
        style: {
          background: 'linear-gradient(to right, #4169e1, #87cefa, #f0f0f0)',
          ...commonStyle,
        },
      }
    case 4:
      return {
        icon: PokeBall,
        style: {
          background: 'linear-gradient(to right, #ff0000, #ffffff, #f0f0f0)',
          ...commonStyle,
        },
      }
    default:
      return { icon: null, style: { ...commonStyle } }
  }
}

export const getPlaceBall = (place: string) => {
  const pokeball = getBall(place)

  return (
    pokeball.icon && (
      <img
        width={25}
        security="restricted"
        src={pokeball.icon}
        alt="place icon"
      />
    )
  )
}