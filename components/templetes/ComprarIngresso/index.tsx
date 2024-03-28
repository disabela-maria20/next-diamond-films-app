'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import Style from './ComprarIngresso.module.scss'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'

import { Loading } from '@/components/atoms'
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
  movie?: IFilmeResponse
  sessions?: Session[]
}

const ComprarIngresso = ({ banner, listaFilmes }: IComprarIngressoProps) => {
  const isMobile: boolean = useIsMobile()
  const [filmesComSessoes, setFilmesComSessoes] = useState<
    IComprarIngressoSessoesResponse[]
  >([])

  const [loading, setLoading] = useState<boolean>(false)
  const [sessoesArray, setSessoesArray] = useState<
    IComprarIngressoSessoesResponse[]
  >([])

  useEffect(() => {
    const fetchSessoes = async () => {
      try {
        setLoading(true)
        const sessoesArray = await Promise.all(
          listaFilmes.releases.map(async (data) => {
            const res = await axios.get(`/movie/get/${data.slug}`)
            return res.data
          })
        )
        setSessoesArray(sessoesArray)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    fetchSessoes()
  }, [listaFilmes.releases, sessoesArray.length])

  useEffect(() => {
    const filmesComSessoes = sessoesArray.filter((data) => {
      return data.sessions && data.sessions.length > 0
    })
    setFilmesComSessoes(filmesComSessoes)
  }, [sessoesArray])

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
                <img
                  src={isMobile ? data.bannerMobile : data.bannerDesktop}
                  alt="Banner"
                  width={1400}
                  height={440}
                />
              </Link>
            ))}
          </Slide.Content>
          <div className="container">
            <Newsletter isBg={true} isHorrizontal={!isMobile && true} />
          </div>
        </>
      )}
      <section className={Style.ComprarIngresso}>
        <div className="container">
          <h1>
            EM EXIBIÇÃO
            <span>
              Confira os horários das sessões dos filmes da Diamond em exibição
              nos cinemas e garanta seus ingressos.
            </span>
          </h1>
          {filmesComSessoes.length === 0 && !loading && (
            <p className={Style.CompraIgressoSessaoIndisponivel}>
              Nenhuma sessão disponível no momento.
            </p>
          )}
          {loading && <Loading />}
          {!loading && (
            <>
              {filmesComSessoes.map((sessoes) => {
                return (
                  <div key={sessoes.movie?.id} className={Style.itemSessao}>
                    {sessoes.movie && sessoes.sessions && (
                      <>
                        <Sessoes
                          filme={sessoes?.movie}
                          poster={
                            !isMobile
                              ? sessoes?.movie.bannerMobile
                              : sessoes?.movie.bannerDesktop
                          }
                          color={sessoes?.movie.color}
                          sessao={sessoes?.sessions}
                        />
                      </>
                    )}
                  </div>
                )
              })}
            </>
          )}
        </div>
      </section>
    </>
  )
}

export default ComprarIngresso
