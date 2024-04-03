/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import React, { useState, useMemo, ChangeEvent, useEffect } from 'react'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { IoSearchSharp } from 'react-icons/io5'

import Style from './Sessoes.module.scss'

import * as S from './styles'

import { useFormatarData } from '@/utils/hooks/useFormatarData/formatarData'
import { useGtag } from '@/utils/lib/gtag'
import { IFilmeResponse, Session } from '@/utils/server/types'
import { darken } from 'polished'

interface ISessoesProps {
  filme: IFilmeResponse
  poster: string
  color: string
  sessao: Session[]
}

interface LocationData {
  latitude: number
  longitude: number
}

const Sessoes = ({ poster, color, sessao, filme }: ISessoesProps) => {
  const { formatDia, formatMes, formatDiaDaSemana } = useFormatarData()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [sessoesData, setSessoesData] = useState<Session[]>([])

  const DISTANCIA = 20

  const getLocal =
    typeof window !== 'undefined'
      ? window.localStorage.getItem('locationCoords')
      : null

  const localizacao: LocationData = getLocal
    ? JSON.parse(getLocal)
    : { latitude: 0, longitude: 0 }

  const { dataLayerMovieTicket } = useGtag()

  const calculateDistance = (lat2: number, lon2: number) => {
    const lat1 = localizacao.latitude
    const lon1 = localizacao.longitude

    if (lat1 === 0 && lon1 === 0) {
      return 0
    }

    const R = 6371
    const dLat = ((lat2 - lat1) * Math.PI) / 180
    const dLon = ((lon2 - lon1) * Math.PI) / 180
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const distanceInKilometers = R * c

    return distanceInKilometers
  }

  useEffect(() => {
    const sessionsWithDistance = sessao
      .map((data) => ({
        ...data,
        sessions: data.sessions.map((session) => ({
          ...session,
          distance: calculateDistance(Number(session.lat), Number(session.lng))
        }))
      }))
      .filter((data) => {
        return (
          data.sessions.some(
            (session) =>
              session.theaterName
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
              session.address.toLowerCase().includes(searchTerm.toLowerCase())
          ) &&
          (!selectedDate || data.date === selectedDate)
        )
      })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const groupedSessions: { [key: string]: Session } = {}

    sessionsWithDistance.map(({ sessions }) => {
      sessions.map(
        ({ theaterName, hour: sessionHour, link: links, date, ...rest }) => {
          const key = `${theaterName}`
          if (!groupedSessions[key]) {
            groupedSessions[key] = {
              theaterName,
              date,
              hour: sessionHour,
              // @ts-ignore: Unreachable code error
              hours: [],
              ...rest
            }
          }
          // @ts-ignore: Unreachable code error
          groupedSessions[key].hours.push({ hour: sessionHour, link: links })
        }
      )
    })

    const groupedSessionsArray = Object.values(groupedSessions)

    const sortedSessionsByDistance = groupedSessionsArray.map((group) => ({
      ...group,
      sessions: group.sessions
    }))

    const permissaoSim = sortedSessionsByDistance.filter((data) => {
      return data.distance <= DISTANCIA
    })

    const permissaoNao = sortedSessionsByDistance.filter((data) => {
      return data.distance === 0 || data.distance
    })

    setSessoesData(permissaoSim.length > 0 ? permissaoSim : permissaoNao)
  }, [searchTerm, selectedDate])

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleDataClick = (date: string) => {
    setSearchTerm('')
    setSelectedDate(date)
  }

  useEffect(() => {
    setSelectedDate(new Date().toISOString().split('T')[0])
  }, [])

  useEffect(() => {
    if (!selectedDate && sessao.length > 0) {
      setSelectedDate(sessao[0].date)
    }
  }, [selectedDate, sessao])

  function handleClickBanner(data: Session) {
    dataLayerMovieTicket(
      filme.title,
      filme.slug,
      filme.originalTitle,
      filme.genre,
      data.theaterName,
      data.address,
      data.hour
    )
  }

  const noResultsMessage = useMemo(() => {
    if (searchTerm.trim() !== '' || selectedDate) {
      if (sessao?.length === 0) {
        return (
          <div className={Style.noResults}>Nenhum resultado encontrado.</div>
        )
      }
    }
    return null
  }, [
    searchTerm,
    selectedDate,
    DISTANCIA,
    localizacao.latitude,
    localizacao.latitude
  ])

  return (
    <section className={Style.areaSessao}>
      <div className={Style.gridSessoes}>
        <img src={poster} alt="Poster Filme" width={1000} height={500} />
        <div
          className={Style.areaPesquisa}
          style={{ background: `${darken(0.1, color)}` }}
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
            {sessao.map((data, i) => (
              <S.ButtonHora
                key={i}
                $bg={` ${selectedDate === data.date ? darken(0.1, color) : '#fff'}`}
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
            {sessoesData
              .filter(
                (session) =>
                  session.theaterName
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                  session.address
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
              )
              .sort(
                (a: { distance: number }, b: { distance: number }) =>
                  a.distance - b.distance
              )
              .map((session, i) => (
                <div key={1 + i} className={Style.ItemSessao}>
                  <div className={Style.flexTitle}>
                    <img
                      src="/img/icon _ticket_.png"
                      alt={session.theaterName}
                      width={50}
                      height={50}
                    />
                    <div className={Style.areaTitle}>
                      <h3>{session.theaterName}</h3>
                      <h4>
                        {session.distance !== 0 && (
                          <a
                            href={`https://maps.google.com/?q=${session.lat},${session.lng}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <strong className={Style.areaDistancia}>
                              <FaMapMarkerAlt />
                              <span>{session.distance.toFixed(1)}</span>KM -
                            </strong>
                          </a>
                        )}
                        {session.address}, {session.number}
                        {session.addressComplement && '-'}
                        {session.addressComplement}
                      </h4>
                    </div>
                  </div>
                  <div className={Style.areaSalaHorario}>
                    <span>{session.technology}</span>
                    <ul>
                      {session.hours.map((hour, i) => (
                        <li key={1 + i}>
                          <S.LinkHora
                            href={hour.link}
                            $color={color}
                            onClick={() => handleClickBanner(session)}
                            target="_blank"
                          >
                            {hour.hour}
                          </S.LinkHora>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default React.memo(Sessoes)
