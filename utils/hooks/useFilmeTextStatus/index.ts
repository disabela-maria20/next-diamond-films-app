import { useFormatarData } from '../useFormatarData/formatarData'

import { IFilmeResponse } from '@/utils/server/types'

const useFilmeTextStatus = () => {
  const { formatMesmaSemana, formatfaltaUmaSemanaParaDataMarcada } =
    useFormatarData()

  const statusTextData = (filmeLista: IFilmeResponse) => {
    if (formatMesmaSemana(filmeLista.releasedate)) return 'Hoje nos Cinemas'
    if (formatfaltaUmaSemanaParaDataMarcada(filmeLista.releasedate)) {
      return 'Em pré-venda'
    }
    if (filmeLista.streaming.length > 0) {
      return 'Em streaming'
    }

    return 'Em breve nos cinemas'
  }

  return statusTextData
}

export default useFilmeTextStatus
