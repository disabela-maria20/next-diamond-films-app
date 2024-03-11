import { useState } from 'react'

const useFilmeTextStatus = () => {
  const [status, setStatus] = useState<string>('Em breve nos cinemas.')

  const statusTextData = (releasedate: string) => {
    const preVenda = !new Date() && !new Date(releasedate)
    const nosCinemas = new Date() == new Date(releasedate)
    const emBreve = !new Date() && !new Date(releasedate)

    if (preVenda) {
      setStatus('Em pré-venda')
    }
    if (nosCinemas) {
      setStatus('Nos cinemas')
    }
    if (emBreve) {
      setStatus('Em breve nos cinemas')
    }
    if (preVenda) {
      setStatus('Em pré-venda')
    }
    return status
  }

  return statusTextData
}

export default useFilmeTextStatus
