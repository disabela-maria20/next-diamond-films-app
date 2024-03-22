'use client'

import { useEffect, useState } from 'react'
import { FaInstagram, FaYoutube } from 'react-icons/fa'

import Style from './Filme.module.scss'
import { FreeMode, Scrollbar } from 'swiper/modules'

import { Model, Newsletter, Slide } from '@/components/molecules'
import { Sessoes } from '@/components/organisms'
import { useFormatarData } from '@/utils/hooks/useFormatarData/formatarData'
import useIsMobile from '@/utils/hooks/useIsMobile/isMobile'
import { useGtag } from '@/utils/lib/gtag'
import {
  IFilmeResponse,
  IFilmeResponseUrl,
  Session
} from '@/utils/server/types'
import { SwiperOptions } from 'swiper/types'

interface IFilmeProps {
  movie: {
    movie: IFilmeResponse
    sessions: Session[]
  }
}

// enum EStreaming {
//   Netflix = 'Netflix',
//   AmazonPrime = 'Amazon Prime',
//   DisneyPlus = 'Disney+',
//   Hulu = 'Hulu',
//   HBO = 'HBO',
//   AppleTVPlus = 'Apple TV+'
// }

const classificacoesIndicativas = [
  { idade: 'Livre', cor: '#048f16' },
  { idade: '10', cor: '#0281df' },
  { idade: '12', cor: '#f5d218' },
  { idade: '14', cor: '#f0850c' },
  { idade: '16', cor: '#d40011' },
  { idade: '18', cor: '#000000' }
]

function setDefinirCorClassificacaoIndicativa(idade: string) {
  const classificacao = classificacoesIndicativas.find(
    (classificacao) => classificacao.idade === idade
  )

  return classificacao ? classificacao.cor : ''
}

// const setStreaming = (streaming: string[]): string[] => {
//   const availableStreamings: string[] = []
//   const enumKeys = Object.keys(EStreaming)

//   streaming.forEach((stream: string) => {
//     const matchingKey = enumKeys.find(
//       (key) =>
//         EStreaming[key as keyof typeof EStreaming].toLowerCase() ===
//         stream.toLowerCase()
//     )
//     if (matchingKey) {
//       availableStreamings.push(matchingKey)
//     }
//   })

//   return availableStreamings
// }

function converterParaHorasEMinutos(totalMinutos: number) {
  const horas = Math.floor(totalMinutos / 60)
  const minutos = totalMinutos % 60

  return `${horas}h e ${minutos}min`
}

const Filme = (data: IFilmeProps) => {
  const [open, setOpen] = useState<boolean>(false)
  const [iframe, setIframe] = useState<string>()
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [image, setImage] = useState<IFilmeResponseUrl>()

  const filme = data.movie?.movie
  const sessoes = data.movie.sessions

  const isMobile: boolean = useIsMobile()
  //const formatarData = useFormatarData()
  const emExibicao = new Date() >= new Date(filme?.releasedate)
  //const streaming = setStreaming(filme?.streaming)

  const { formatarData } = useFormatarData()
  const { dataLayerFichafilme, dataLayerPlayTrailer } = useGtag()

  useEffect(() => {
    dataLayerFichafilme(
      filme.title,
      filme.slug,
      filme.originalTitle,
      filme.genre
    )
  }, [
    dataLayerFichafilme,
    filme.genre,
    filme.originalTitle,
    filme.slug,
    filme.title
  ])

  function handleVerImagem(data: IFilmeResponseUrl) {
    setOpen(true)
    setImage(data)
  }

  function handleVerVideo(data: string) {
    setOpenModal(true)
    setIframe(data)
  }

  const swiperOptions: SwiperOptions = {
    slidesPerView: 2,
    spaceBetween: 10,
    freeMode: true,
    pagination: {
      clickable: true
    },
    scrollbar: { hide: true },
    modules: [FreeMode, Scrollbar],
    breakpoints: {
      640: {
        slidesPerView: 3,
        spaceBetween: 20
      },
      768: {
        slidesPerView: 4,
        spaceBetween: 10
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const swiperOptionsVideo: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 10,
    freeMode: true,
    grabCursor: true,
    // pagination: {
    //   clickable: true
    // },
    pagination: false,
    scrollbar: { hide: true },
    modules: [FreeMode, Scrollbar],
    breakpoints: {
      640: {
        slidesPerView: 2,
        spaceBetween: 20
      }
    }
  }

  const Links = ({ youtube, insta }: { youtube: string; insta: string }) => {
    return (
      <div className={Style.AreaLinksSociais}>
        {!!insta && (
          <a
            className={Style.instagram}
            href={insta}
            target="_blank"
            rel="noreferrer"
          >
            <FaInstagram />
          </a>
        )}
        {!!youtube && (
          <span
            className={Style.areaAssitirTrailer}
            onClick={() => handleVerVideo(youtube)}
          >
            <FaYoutube />
            <span>ASSISTA AO TRAILER</span>
          </span>
        )}
      </div>
    )
  }

  return (
    <>
      <section className={Style.areaBanner}>
        <img
          src={isMobile ? filme?.bannerMobile : filme?.bannerDesktop}
          alt={filme?.title}
        />
        <div className={Style.bannerFilme}>
          <div className="container">
            <div className={Style.areaTituloBanner}>
              <h1 style={{ color: `${filme.color}` }}>{filme.title}</h1>
              {emExibicao && (
                <h2 className={Style.emExibicao}>
                  <strong>EM EXIBIÇÃO</strong> SOMENTE NOS CINEMAS
                </h2>
              )}
            </div>
            {/* {!isMobile && <Links youtube={filme?.trailer} insta="" />} */}
          </div>
        </div>
      </section>
      <div className="container">
        <Newsletter isHorrizontal={!isMobile} isBg={true} filmes={filme} />
      </div>

      <div style={{ overflowX: 'hidden' }}>
        <div className="container">
          {emExibicao && isMobile && (
            <div className={Style.areaBtnCompra}>
              <button> COMPRAR INGRESSOS </button>
            </div>
          )}
          {/* {filme?.status != 'ativo' && streaming !== null && (
              <div className={Style.areaBtn}>
                {streaming.map((service, index) => (
                  <button key={index}>
                    ASSISTA AGORA NO
                    <img
                      src={`/img/streaming/${service.toLowerCase()}.png`}
                      alt={service.toLowerCase()}
                      width="100"
                    />
                  </button>
                ))}
              </div>
            )} */}
          <div className={Style.areaPoster}>
            <div className={Style.areaFlexPoster}>
              <img src={filme?.cover} alt="" />
              <div>
                <h2>Sinopse</h2>
                <p>{filme?.shortSynopsis}</p>
                <Links youtube={filme?.trailer} insta=""></Links>
              </div>
            </div>

            <div className={Style.areaFlexInformacoes}>
              <div>
                <h2>Informações</h2>
                <div className={Style.areaClassificaçãoIndicativa}>
                  {filme?.age && (
                    <span
                      style={{
                        background: `${setDefinirCorClassificacaoIndicativa(filme?.age)}`
                      }}
                    >
                      {filme?.age}
                    </span>
                  )}

                  <p>{filme?.ageExplain}</p>
                </div>
                <ul className={Style.areainformacaoFilme}>
                  <li>
                    <strong>Título Internacional:</strong>
                    {filme?.originalTitle}
                  </li>
                  <li>
                    <strong>Duração:</strong>
                    {converterParaHorasEMinutos(filme?.duration)}
                  </li>
                  <li>
                    <strong>Gênero:</strong>
                    {filme?.genre}
                  </li>
                  <li>
                    <strong>Elenco:</strong>
                    {filme?.cast}
                  </li>
                  <li>
                    <strong>Direção:</strong>
                    {filme?.director}
                  </li>
                  <li>
                    <strong>Data de Estreia:</strong>
                    {formatarData(filme?.releasedate)}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <Slide.Title className={Style.slideTitle}>Vídeos</Slide.Title>
          <section className={Style.areaIframeVideoYoutube}>
            <section className={Style.gridIframeVideoYoutube}>
              {filme?.videos?.map((data) => (
                <div
                  className={Style.iframeVideoYoutube}
                  key={data.url}
                  onClick={() =>
                    dataLayerPlayTrailer(
                      filme.title,
                      filme.slug,
                      filme.originalTitle,
                      filme.genre,
                      'HUB'
                    )
                  }
                >
                  <iframe
                    className={Style.embedResponsiveItem}
                    src={data.url}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
              ))}
            </section>
          </section>

          <Slide.Title className={Style.slideTitle}>Galeria</Slide.Title>
          <Slide.Content
            swiperOptions={swiperOptions}
            className={Style.areaSlide}
          >
            {filme?.images?.map((data) => (
              <div key={data.url}>
                <img
                  className={Style.SlideImgFilme}
                  src={`${data.url}`}
                  onClick={() => handleVerImagem(data)}
                  style={{ cursor: 'pointer' }}
                />
              </div>
            ))}
          </Slide.Content>

          {sessoes.length > 0 && (
            <>
              <h2 className={Style.slideTitle}>Comprar ingressos</h2>
              <Sessoes
                filme={filme}
                sessao={sessoes}
                color={filme.color}
                poster={!isMobile ? filme.bannerMobile : filme.bannerDesktop}
              />
            </>
          )}

          {open && (
            <Model.Root>
              <Model.Body
                setOpen={() => setOpen(!open)}
                className={Style.modalImageFilme}
              >
                <img src={image?.url} className={Style.modalSlideImg} />
              </Model.Body>
            </Model.Root>
          )}
          {openModal && (
            <Model.Root>
              <Model.Body
                setOpen={() => setOpenModal(!openModal)}
                className={Style.ModaliframeVideoYoutube}
              >
                <div className={Style.iframeVideoYoutube} key={iframe}>
                  <iframe
                    className={Style.embedResponsiveItem}
                    src={iframe}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
              </Model.Body>
            </Model.Root>
          )}
        </div>
      </div>
    </>
  )
}

export default Filme
