/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import React, { useState, useEffect } from 'react'
import { FaMapMarkedAlt } from 'react-icons/fa'
import { IoSearchSharp } from 'react-icons/io5'

import Style from './Sessoes.module.scss'

import * as S from './styles'

interface ISessoesProps {
  filme: IFilmeResponse
  poster: string
  color: string
  sessao: Session[]
}

import { useLocationContext } from '@/components/molecules/Location/LocationContext'
import { useFormatarData } from '@/utils/hooks/useFormatarData/formatarData'
import { useGtag } from '@/utils/lib/gtag'
import {
  ESTADOS,
  IFilmeResponse,
  LocationData,
  Session,
  Sessions
} from '@/utils/server/types'
import Cookies from 'js-cookie'
import { darken } from 'polished'
const DISTANCIA = 20

const Sessoes: React.FC<ISessoesProps> = ({ sessao, color, poster, filme }) => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [filteredSessions, setFilteredSessions] = useState<Sessions[]>([])

  const { formatDia, formatMes, formatDiaDaSemana } = useFormatarData()

  const { dataLayerMovieTicket } = useGtag()

  const { location, loading } = useLocationContext()

  const getLocal =
    typeof window !== 'undefined' ? Cookies.get('geolocation') : null

  const localizacao: LocationData = getLocal
    ? JSON.parse(getLocal)
    : { latitude: 0, longitude: 0 }

  const calculateDistance = (lat2: number, lon2: number) => {
    const lat1 = location.latitude
    const lon1 = location.longitude

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
  function obterNomeEstado(sigla: string): string {
    return ESTADOS[sigla] || 'Estado não encontrado'
  }

  const groupSessoes = (sessao: Sessions[][] | undefined) => {
    const groupedSessions: { [key: string]: Sessions } = {}

    sessao?.map((sessionsArray) => {
      sessionsArray?.map(
        ({ theaterName, hour: sessionHour, link: links, ...rest }) => {
          const key = `${theaterName}`
          const distance = calculateDistance(Number(rest.lat), Number(rest.lng))
          const stateName = obterNomeEstado(rest.state)
          if (!groupedSessions[key]) {
            groupedSessions[key] = {
              theaterName,
              hour: sessionHour,
              // @ts-ignore: Unreachable code error
              hours: [],
              // @ts-ignore: Unreachable code error
              distance,
              // @ts-ignore: Unreachable code error
              stateName,
              ...rest
            }
          }
          // @ts-ignore: Unreachable code error
          groupedSessions[key].hours.push({ hour: sessionHour, links: links })
        }
      )
    })

    const groupedSessionsArray = Object.values(groupedSessions)

    const sortedSessionsByDistance = groupedSessionsArray.sort((a, b) => {
      return a.distance - b.distance
    })

    return sortedSessionsByDistance
  }

  useEffect(() => {
    setSelectedDate(new Date().toISOString().split('T')[0])
  }, [])

  useEffect(() => {
    if (sessao) {
      const getDate = sessao.find((session) => session?.date === selectedDate)
      if (getDate) {
        setFilteredSessions(groupSessoes([getDate.sessions]))
      } else {
        setSelectedDate(sessao[0].date)
        setFilteredSessions(groupSessoes([sessao[0].sessions]))
      }
    }
  }, [selectedDate, location, loading])

  function handleDataClick(date: string): void {
    const selectedSession = sessao?.find((session) => session?.date === date)
    const filteredSessions = selectedSession
      ? groupSessoes([selectedSession.sessions])
      : []
    setFilteredSessions(filteredSessions)
    setSelectedDate(date)
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const search = event.target.value
    setSearchTerm(search)
    const listArray = sessao
      .filter((item) => item.date === selectedDate)
      .map((data) =>
        data.sessions.filter(
          (item: {
            address: string
            city: string
            theaterName: string
            stateName: string
          }) =>
            item?.address?.toLowerCase().includes(search.toLowerCase()) ||
            item?.city?.toLowerCase().includes(search.toLowerCase()) ||
            item?.theaterName?.toLowerCase().includes(search.toLowerCase()) ||
            item?.stateName?.toLowerCase().includes(search.toLowerCase())
        )
      )
    setFilteredSessions(groupSessoes(listArray))
  }

  function formatarHora(hora: string): string {
    return hora.slice(0, 5)
  }
  function handleClickBanner(data: Sessions) {
    dataLayerMovieTicket(
      filme.title,
      filme.slug,
      filme.originalTitle,
      filme.genre,
      data.theaterName,
      data.address,
      data.hour,
      Number(filme.idVibezzMovie)
    )
  }
  return (
    <section className={Style.areaSessao}>
      <div className={Style.gridSessoes}>
        <img
          className={Style.SessoesPoster}
          src={poster}
          alt="Poster Filme"
          width={1000}
          height={500}
        />
        <div
          className={Style.areaPesquisa}
          style={{ background: `${darken(0.2, color)}` }}
        >
          <div className={Style.flexAreaPesquisa}>
            <IoSearchSharp />
            <input
              type="text"
              placeholder="Pesquisar por cinema ou cidade"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div className={Style.flexData} style={{ background: `${color}` }}>
            {sessao.map((data, i) => (
              <S.ButtonHora
                key={i}
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
            {filteredSessions &&
              filteredSessions.map((session, i) => (
                <div key={1 + i} className={Style.ItemSessao}>
                  <div className={Style.flexTitle}>
                    <img
                      src="/img/icon _ticket_.png"
                      alt={session.theaterName}
                      width={50}
                      height={50}
                    />
                    <div className={Style.areaTitle}>
                      {session.distance > 0 && (
                        <>
                          <span>{session.distance.toFixed(1)}</span>KM
                        </>
                      )}
                      <div className={Style.flexTitleName}>
                        <h3>{session.theaterName}</h3>

                        <S.LinkLocation
                          href={`https://maps.google.com/?q=${session.lat},${session.lng}`}
                          target="_blank"
                          rel="noreferrer"
                          $color={color}
                        >
                          <FaMapMarkedAlt />
                        </S.LinkLocation>
                      </div>
                      <h4>
                        {session.address}, {session.number}
                        {session.addressComplement && '-'}
                        {session.addressComplement}, {session.city} {' - '}
                        {session.state}
                      </h4>
                    </div>
                  </div>
                  <div className={Style.areaSalaHorario}>
                    <span>{session.technology}</span>
                    <ul>
                      {session?.hours?.map((hour, i) => (
                        <li key={1 + i}>
                          <S.LinkHora
                            href={hour?.links}
                            $color={color}
                            onClick={() => handleClickBanner(session)}
                            target="_blank"
                          >
                            {formatarHora(hour?.hour)}
                          </S.LinkHora>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            {filteredSessions.length == 0 && <p>Não há sessões disponiveis</p>}
          </div>
        </div>
      </div>
    </section>
  )
}

export default React.memo(Sessoes)
