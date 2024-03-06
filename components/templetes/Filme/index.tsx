'use client'

import { useState } from 'react'
import { FaInstagram, FaYoutube } from 'react-icons/fa'
import ReactPlayer from 'react-player'

//import { useFormatarData } from '@/hooks/useFormatarData/formatarData'
import Style from './Filme.module.scss'
import { FreeMode, Scrollbar } from 'swiper/modules'

import { Model, Newsletter, Slide } from '@/components/molecules'
import { useFormatarData } from '@/utils/hooks/useFormatarData/formatarData'
import useIsMobile from '@/utils/hooks/useIsMobile/isMobile'
import { IFilmeResponse, IFilmeResponseUrl } from '@/utils/server/types'
import { SwiperOptions } from 'swiper/types'

interface IFilmeProps {
  movie: {
    movie: IFilmeResponse
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

const Links = ({ youtube, insta }: { youtube: string; insta: string }) => {
  return (
    <div className={Style.AreaLinksSociais}>
      <a
        className={Style.instagram}
        href={
          insta == '' ? ' https://www.instagram.com/diamondfilmsbr/' : insta
        }
        target="_blank"
        rel="noreferrer"
      >
        <FaInstagram />
      </a>
      {!!youtube && (
        <a className={Style.areaAssitirTrailer} href={youtube}>
          <FaYoutube />
          <span>ASSISTA AO TRAILER</span>
        </a>
      )}
    </div>
  )
}

const Filme = (data: IFilmeProps) => {
  const [open, setOpen] = useState<boolean>(false)
  const [image, setImage] = useState<IFilmeResponseUrl>()
  const filme = data.movie?.movie

  const isMobile: boolean = useIsMobile()
  //const formatarData = useFormatarData()
  const emExibicao = new Date() >= new Date(filme?.releasedate)
  //const streaming = setStreaming(filme?.streaming)

  const formatarData = useFormatarData()

  const swiperOptions: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 10,
    freeMode: true,
    pagination: {
      clickable: true
    },
    scrollbar: { hide: true },
    modules: [FreeMode, Scrollbar],
    breakpoints: {
      640: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 10
      }
    }
  }
  function handleVerImagem(data: IFilmeResponseUrl) {
    setOpen(true)
    setImage(data)
  }

  return (
    <>
      <section className={Style.areaBanner}>
        <div className={Style.bannerFilme}>
          <img
            src={isMobile ? filme?.bannerMobile : filme?.bannerDesktop}
            alt={filme?.title}
          />
        </div>
        <div className="container" style={{ position: 'relative' }}>
          <div className={Style.areaTituloBanner}>
            {/* <img src={} /> */}
            {emExibicao && (
              <h2 className={Style.emExibicao}>
                <strong>EM EXIBIÇÃO</strong> SOMENTE NOS CINEMAS
              </h2>
            )}
          </div>
          {!isMobile && <Links youtube={filme?.trailer} insta="" />}
        </div>
      </section>
      <div className="container">
        <Newsletter isHorrizontal={!isMobile} isBg={true} />
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
              </div>
            </div>

            <div className={Style.areaFlexInformacoes}>
              <div>
                <h2>Informações</h2>
                <div className={Style.areaClassificaçãoIndicativa}>
                  <span
                    style={{
                      background: `${setDefinirCorClassificacaoIndicativa(filme?.age)}`
                    }}
                  >
                    {filme?.age}
                  </span>
                  <p>{filme?.ageExplain}</p>
                </div>
                <ul className={Style.areainformacaoFilme}>
                  <li>
                    <strong>Título Internacional:</strong>
                    {filme?.originalTitle}
                  </li>
                  <li>
                    <strong>Duração:</strong>
                    {filme?.duration}
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

              {isMobile && <Links youtube={filme?.trailer} insta="" />}
            </div>
          </div>
          <Slide.Title className={Style.slideTitle}>Vídeos</Slide.Title>
          <div className={Style.GridFilmes}>
            {filme?.videos?.map((data) => (
              <ReactPlayer url={data.url} key={data.url} />
            ))}
          </div>
          <Slide.Title className={Style.slideTitle}>Galeria</Slide.Title>
          <Slide.Content
            swiperOptions={swiperOptions}
            className={Style.areaSlide}
          >
            {filme?.images?.map((data) => (
              <div key={data.url}>
                <img
                  src={`${data.url}`}
                  onClick={() => handleVerImagem(data)}
                  style={{ cursor: 'pointer' }}
                />
              </div>
            ))}
          </Slide.Content>
          {open && (
            <Model.Root>
              <Model.Body
                setOpen={() => setOpen(!open)}
                className={Style.modalImageFilme}
              >
                <img src={image?.url} />
              </Model.Body>
            </Model.Root>
          )}
        </div>
      </div>
    </>
  )
}

export default Filme