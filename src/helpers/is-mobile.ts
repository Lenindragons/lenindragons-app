import { useState, useEffect } from 'react'

const isMobile = () => {
  return window.innerWidth <= 768
}

const useIsMobile = () => {
  const [mobile, setMobile] = useState(isMobile())

  useEffect(() => {
    const handleResize = () => {
      setMobile(isMobile())
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return mobile
}

export default useIsMobile
