import { useEffect } from 'react'
import { usePage } from '../../context/PageContext'

export const HomePage = () => {
  const { setTitle } = usePage()

  useEffect(() => {
    setTitle('Seu Perfil')
  }, [setTitle])

  return (
    <div>
      <p>Profile page content</p>
    </div>
  )
}
