/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

'use client'
// import { useEffect } from 'react'

// import { getProgSessoes } from '@/utils/server/requests'
import { useState, useEffect } from 'react'
import { IoSearchSharp } from 'react-icons/io5'

import Style from './Sessoes.module.scss'

import { useFormatarData } from '@/utils/hooks/useFormatarData/formatarData'
import { Filme, IFilmesEstadosResponse } from '@/utils/server/types'
interface ISessoesProps {
  estados: IFilmesEstadosResponse | undefined
  poster: string
  color: string
}

const Sessoes = ({ estados, poster, color }: ISessoesProps) => {
  const [estado, setEstado] = useState<string>()
  const [cidade, setCidade] = useState<string>()
  const [sessao, setSessao] = useState<Filme>()
  const { formatDia, formatMes, formatDiaDaSemana } = useFormatarData()

  const SESSOES_FILME = process.env.ENDPOINT_SESSOES
  useEffect(() => {
    const headleFetch = async () => {
      try {
        const res = await axios.get(
          `${SESSOES_FILME}/20899/${removerAcentos(estado)}/${removerAcentos(cidade)}`
        )
        setSessao(res.data)
      } catch (error) {
        console.error('Erro ao buscar sessões:', error)
      }
    }
    headleFetch()
  }, [SESSOES_FILME, cidade, estado])

  const removerAcentos = (text: string) => {
    const text_norm = text
    return text_norm.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  }

  if (sessao?.filme.programacao) return 'Carregando..'
  return (
    <section className={Style.areaSessao}>
      <div className={Style.gridSessoes}>
        <div>
          <img src={poster} alt="" />
        </div>
        <div className={Style.areaPesquisa}>
          <IoSearchSharp />

          <select
            value={estado}
            onChange={({ target }) => setEstado(target.value)}
          >
            {[...new Set(estados?.estados.map((data) => data.ESTADO))].map(
              (estado) => (
                <option value={estado} key={estado}>
                  {estado}
                </option>
              )
            )}
          </select>
          <select
            value={cidade}
            onChange={({ target }) => setCidade(target.value)}
          >
            {estados?.estados
              .filter((data) => data.ESTADO === estado)
              .map((data) => (
                <option value={data.CIDADE} key={data.CIDADE}>
                  {data.CIDADE}
                </option>
              ))}
          </select>
        </div>

        {Object.keys(sessao?.filme.programacao).map((data, index) => (
          <div key={index}>
            <div className={Style.flexData}>
              <div className={Style.areaData}>
                <span className={Style.mes}>{formatMes(data)}</span>
                <span className={Style.dia}>{formatDia(data)}</span>
                <span className={Style.diaSemana}>
                  {formatDiaDaSemana(data)}
                </span>
              </div>
            </div>
            <div className={Style.areaSessao}>Escolha uma sessão:</div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Sessoes
