import { useFormatarData } from '../useFormatarData/formatarData'

import { IFilmeResponse } from '@/utils/server/types'

const useFilmeTextStatus = () => {
  const {
    formatfaltaUmaSemanaParaDataMarcada,
    formatPassouUmaSemanaDesdeData,
    formatDataEstreia
  } = useFormatarData()

  const statusTextData = (filmeLista: IFilmeResponse) => {
    console.log(new Date())

    if (
      filmeLista.hasSession &&
      formatfaltaUmaSemanaParaDataMarcada(filmeLista.releasedate)
    )
      return 'Em pré-venda'
    if (filmeLista.streaming.length > 0) return 'Em streaming'
    if (
      (filmeLista.hasSession && formatDataEstreia(filmeLista.releasedate)) ||
      formatPassouUmaSemanaDesdeData(filmeLista.releasedate)
    )
      return 'Hoje nos cinemas'
    return 'Em breve nos cinemas'
  }

  return statusTextData
}

export default useFilmeTextStatus
