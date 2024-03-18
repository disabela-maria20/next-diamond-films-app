'use client'
import React, { useState, useMemo, ChangeEvent, useRef } from 'react'
import { IoSearchSharp } from 'react-icons/io5'

import Style from './Sessoes.module.scss'

import * as S from './styles'

import { useFormatarData } from '@/utils/hooks/useFormatarData/formatarData'
import { Session } from '@/utils/server/types'
import { darken } from 'polished'

interface ISessoesProps {
  poster: string
  color: string
  sessao: Session[]
}

const Sessoes = ({ poster, color, sessao }: ISessoesProps) => {
  const { formatDia, formatMes, formatDiaDaSemana } = useFormatarData()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const originalSessao = useRef(sessao)

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleDataClick = (date: string) => {
    setSelectedDate(date)
  }

  const filteredSessions = useMemo(() => {
    if (!searchTerm && !selectedDate) return originalSessao.current

    return originalSessao.current.filter(
      (data) =>
        data.sessions.some(
          (session) =>
            session.theaterName
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            session.address.toLowerCase().includes(searchTerm.toLowerCase())
        ) &&
        (!selectedDate || data.date === selectedDate)
    )
  }, [searchTerm, selectedDate])

  const noResultsMessage = useMemo(() => {
    if (searchTerm.trim() !== '' || selectedDate) {
      if (filteredSessions.length === 0) {
        return (
          <div className={Style.noResults}>Nenhum resultado encontrado.</div>
        )
      }
    }
    return null
  }, [filteredSessions, searchTerm, selectedDate])

  return (
    <section className={Style.areaSessao}>
      <div className={Style.gridSessoes}>
        <div>
          <img src={poster} alt="" />
        </div>
        <div
          className={Style.areaPesquisa}
          style={{ background: `${darken(0.2, color)}` }}
        >
          <div className={Style.flexAreaPesquisa}>
            <IoSearchSharp />
            <input
              type="text"
              placeholder="Pesquisar"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <div className={Style.flexData} style={{ background: `${color}` }}>
            {sessao.map((data) => (
              <S.ButtonHora
                key={data.link}
                $bg={` ${selectedDate === data.date ? darken(0.2, color) : '#fff'}`}
                className={`${Style.areaData}`}
                onClick={() => handleDataClick(data.date)}
              >
                <span className={Style.mes}>{formatMes(data.date)}</span>
                <span className={Style.dia}>{formatDia(data.date)}</span>
                <span className={Style.diaSemana}>
                  {formatDiaDaSemana(data.date)}
                </span>
              </S.ButtonHora>
            ))}
          </div>
          <div className={Style.areaSessao}>Escolha uma sessão:</div>
          <div className={Style.areaCinema}>
            {noResultsMessage}
            {filteredSessions.map((data) => (
              <div key={data.link}>
                {data.sessions
                  .filter(
                    (session) =>
                      session.theaterName
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                      session.address
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                  )
                  .map((session: Session) => (
                    <>
                      <div className={Style.flexTitle}>
                        <img
                          src="/img/icon _ticket_.png"
                          alt=""
                          width={50}
                          height={50}
                        />
                        <div className={Style.areaTitle}>
                          <h3>{session.theaterName}</h3>
                          <h4>
                            {session.address}, {session.number}
                            {session.addressComplement && '-'}
                            {session.addressComplement}
                          </h4>
                        </div>
                      </div>
                      <div className={Style.areaSalaHorario}>
                        <span>{session.technology}</span>
                        <ul>
                          <li>
                            <S.LinkHora href={session.link} $color={color}>
                              {session.hour}
                            </S.LinkHora>
                          </li>
                        </ul>
                      </div>
                    </>
                  ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default React.memo(Sessoes)
