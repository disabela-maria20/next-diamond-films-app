'use client'

import { FaInstagram, FaYoutube } from 'react-icons/fa'

import Style from './Filme.module.scss'

import { Slide } from '@/components/molecules/Slide'
import { useFormatarData } from '@/hooks/useFormatarData/formatarData'
import useIsMobile from '@/hooks/useIsMobile/isMobile'
import { IFilmeResponse } from '@/server/types'

import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/scrollbar'

interface IFilmeProps {
  data: IFilmeResponse[]
}

enum EStreaming {
  Netflix = 'Netflix',
  AmazonPrime = 'Amazon Prime',
  DisneyPlus = 'Disney+',
  Hulu = 'Hulu',
  HBO = 'HBO',
  AppleTVPlus = 'Apple TV+'
}

const classificacoesIndicativas = [
  { idade: 'Livre', cor: '#048f16' },
  { idade: '10', cor: '#0281df' },
  { idade: '12', cor: '#f5d218' },
  { idade: '14', cor: '#f0850c' },
  { idade: '16', cor: '#d40011' },
  { idade: '18', cor: '#000000' }
]

const formatarLista = (lista: string[]): string => {
  if (lista.length === 0) return ''
  if (lista.length === 1) return lista[0]

  const ultimoItem = lista[lista.length - 1]
  const itensAnteriores = lista.slice(0, -1)

  return `${itensAnteriores.join(', ')} e ${ultimoItem}`
}

function setDefinirCorClassificacaoIndicativa(idade: string) {
  const classificacao = classificacoesIndicativas.find(
    (classificacao) => classificacao.idade === idade
  )

  return classificacao ? classificacao.cor : ''
}

const setStreaming = (streaming: string[]): string[] => {
  const availableStreamings: string[] = []
  const enumKeys = Object.keys(EStreaming)

  streaming.forEach((stream: string) => {
    const matchingKey = enumKeys.find(
      (key) =>
        EStreaming[key as keyof typeof EStreaming].toLowerCase() ===
        stream.toLowerCase()
    )
    if (matchingKey) {
      availableStreamings.push(matchingKey)
    }
  })

  return availableStreamings
}

const Links = ({ youtube, insta }: { youtube: string; insta: string }) => {
  return (
    <div className={Style.AreaLinksSociais}>
      <a className={Style.instagram} href={insta}>
        <FaInstagram />
      </a>
      <a className={Style.areaAssitirTrailer} href={youtube}>
        <FaYoutube />
        <span>ASSISTA AO TRAILER</span>
      </a>
    </div>
  )
}

const Filme = (data: IFilmeProps) => {
  const filme = data.data as IFilmeResponse[]
  const isMobile: boolean = useIsMobile()
  const formatarData = useFormatarData()

  return (
    <section>
      {filme.map((filme) => {
        const emExibicao = new Date() >= new Date(filme.data_estreia)
        const streaming = setStreaming(filme.streaming)
        return (
          <div key={filme.id_vibezz_movie}>
            <div className={Style.areaBanner}>
              <div className={Style.bannerFilme}>
                <img
                  src={isMobile ? filme.banner_mobile : filme.banner_desktop}
                  alt={filme.titulo_internacional}
                />
              </div>
              <div className="container" style={{ position: 'relative' }}>
                <div className={Style.areaTituloBanner}>
                  <img src={filme.banner_logo} />
                  {emExibicao && (
                    <h2 className={Style.emExibicao}>
                      <strong>EM EXIBIÇÃO</strong> SOMENTE NOS CINEMAS
                    </h2>
                  )}
                </div>
                {!isMobile && (
                  <Links youtube={filme.trailer_principal} insta="" />
                )}
              </div>
            </div>
            <div className="container">
              {emExibicao && isMobile && (
                <div className={Style.areaBtnCompra}>
                  <button> COMPRAR INGRESSOS </button>
                </div>
              )}
              {filme.status != 'ativo' && streaming !== null && (
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
              )}
              <div className={Style.areaPoster}>
                <div className={Style.areaFlexPoster}>
                  <img src={filme.poster_sinopse} alt="" />
                  <div>
                    <h2>Sinopse</h2>
                    <p>{filme.sinopse}</p>
                  </div>
                </div>

                <div className={Style.areaFlexInformacoes}>
                  <div>
                    <h2>Informações</h2>
                    <div className={Style.areaClassificaçãoIndicativa}>
                      <span
                        style={{
                          background: `${setDefinirCorClassificacaoIndicativa(filme.classificacao)}`
                        }}
                      >
                        {filme.classificacao}
                      </span>
                      <p>{filme.classificacao_desc}</p>
                    </div>
                    <ul className={Style.areainformacaoFilme}>
                      <li>
                        <strong>Título Internacional:</strong>
                        {filme.titulo_internacional}
                      </li>
                      <li>
                        <strong>Duração:</strong>
                        {filme.duracao}
                      </li>
                      <li>
                        <strong>Gênero:</strong>
                        {filme.genero}
                      </li>
                      <li>
                        <strong>Elenco:</strong>
                        {formatarLista(filme.elenco)}
                      </li>
                      <li>
                        <strong>Direção:</strong>
                        {filme.direcao}
                      </li>
                      <li>
                        <strong>Data de Estreia:</strong>
                        {formatarData(filme.data_estreia)}
                      </li>
                    </ul>
                  </div>

                  {isMobile && (
                    <Links youtube={filme.trailer_principal} insta="" />
                  )}
                </div>
              </div>
              <Slide.Title>Vídeos</Slide.Title>
              <Slide.Content url={filme.videos} isVideo={true} />
              <Slide.Title>Galeria</Slide.Title>
              <Slide.Content url={filme.galeria} isVideo={false} />
            </div>
          </div>
        )
      })}
    </section>
  )
}

export default Filme
