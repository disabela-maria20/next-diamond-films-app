/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useContext, useEffect, useState } from 'react'

import { useFormatarData } from '../useFormatarData/formatarData'

import { useFilmesLancamentos } from '@/utils/context/FilmesLancamentos'
import { IFilmeResponse, IFilmeTextStatusProps } from '@/utils/server/types'

const useFilmeTextStatus = () => {
  const [status, setStatus] = useState<string>('Em breve nos cinemas.')
  const globalData = useFilmesLancamentos()
  const { formatMesmaSemana, formatfaltaUmaSemanaParaDataMarcada } =
    useFormatarData()

  //const [sessoes, setSessoes] = useState<IFilmeResponse[]>()
  const statusTextData = (filmeLista: IFilmeResponse) => {
    useEffect(() => {
      globalData?.setSlug(filmeLista.slug)
    }, [])

    useEffect(() => {
      if (globalData?.data) {
        const filme: IFilmeTextStatusProps = globalData?.data

        if (filme.movie.id == filmeLista.id) {
          if (
            filme.sessions.length > 0 &&
            formatMesmaSemana(filme.movie.releasedate)
          )
            setStatus('Hoje nos Cinemas')

          if (formatfaltaUmaSemanaParaDataMarcada(filme.movie.releasedate)) {
            setStatus('Em pré-venda')
          }
          if (filme.movie.streaming.length > 0) {
            setStatus('Em streaming')
          }
        }
      }
    }, [globalData?.data])

    return status
  }

  return statusTextData
}

export default useFilmeTextStatus
