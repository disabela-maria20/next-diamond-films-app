import { useState, useEffect } from 'react'

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false)

  useEffect(() => {
    const checkIsMobile = () => {
      const userAgent: string =
        typeof window.navigator === 'undefined' ? '' : navigator.userAgent
      const isMobileDevice: boolean =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(
          userAgent
        )
      setIsMobile(isMobileDevice)
    }

    checkIsMobile()

    window.addEventListener('resize', checkIsMobile)

    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  return isMobile
}

export default useIsMobile
