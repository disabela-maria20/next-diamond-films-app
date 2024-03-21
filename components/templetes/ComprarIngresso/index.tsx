'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import Style from './ComprarIngresso.module.scss'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'

import { Newsletter, Slide } from '@/components/molecules'
import { Sessoes } from '@/components/organisms'
import useIsMobile from '@/utils/hooks/useIsMobile/isMobile'
import { IFilmeResponse, Session } from '@/utils/server/types'
import axios from 'axios'
import { SwiperOptions } from 'swiper/types'

interface IComprarIngressoProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  banner: Array<any>
  listaFilmes: {
    releases: Array<IFilmeResponse>
    streaming: Array<IFilmeResponse>
  }
}

interface IComprarIngressoSessoesResponse {
  movies?: IFilmeResponse
  sessions?: Session
}

const ComprarIngresso = ({ banner, listaFilmes }: IComprarIngressoProps) => {
  const isMobile: boolean = useIsMobile()
  const [loading, setLoading] = useState<boolean>(false)
  const [sessoesArray, setSessoesArray] = useState<
    IComprarIngressoSessoesResponse[]
  >([])

  useEffect(() => {
    const fetchSessoes = async () => {
      setLoading(true)
      const sessoesArray = await Promise.all(
        listaFilmes.releases.map(async (data) => {
          const res = await axios.get(`/movie/get/${data.slug}`)
          return res.data
        })
      )
      setSessoesArray(sessoesArray)
      setLoading(false)
    }
    fetchSessoes()
  }, [listaFilmes.releases])
  const allSessionsEmpty = sessoesArray.every(
    (sessoes) =>
      !sessoes.movies &&
      (!sessoes.sessions ||
        !sessoes.sessions.sessions ||
        sessoes.sessions.sessions.length === 0)
  )

  const bannerSwiperOptions: SwiperOptions = {
    slidesPerView: 1,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false
    },
    pagination: isMobile ? false : true,
    navigation: isMobile ? false : true,
    modules: [Navigation, Pagination, Autoplay]
  }

  return (
    <>
      {!isMobile && (
        <>
          <Slide.Content
            swiperOptions={bannerSwiperOptions}
            className={Style.slideBanner}
          >
            {banner?.map((data) => (
              <Link href={data.slug} key={data.id}>
                <img src={isMobile ? data.bannerMobile : data.bannerDesktop} />
              </Link>
            ))}
          </Slide.Content>
          <div className="container">
            <Newsletter isBg={true} isHorrizontal={!isMobile && true} />
          </div>
        </>
      )}

      {loading && 'Carregando'}
      {!loading && (
        <section className={Style.ComprarIngresso}>
          <div className="container">
            {allSessionsEmpty ? (
              <p className={Style.CompraIgressoSessaoIndisponivel}>
                Nenhuma sessão disponível no momento.
              </p>
            ) : (
              sessoesArray.map((sessoes) => (
                <>
                  <h1>
                    EM EXIBIÇÃO
                    <span>
                      Confira os horários das sessões dos filmes da Diamond em
                      exibição nos cinemas e garanta seus ingressos.
                    </span>
                  </h1>
                  {sessoes.movies && sessoes.sessions && (
                    <Sessoes
                      filme={sessoes.movies}
                      key={sessoes?.movies?.id}
                      poster={
                        !isMobile
                          ? sessoes?.movies.bannerMobile
                          : sessoes?.movies.bannerDesktop
                      }
                      color={sessoes?.movies.color}
                      sessao={sessoes?.sessions.sessions}
                    />
                  )}
                </>
              ))
            )}
          </div>
        </section>
      )}
    </>
  )
}

export default ComprarIngresso
