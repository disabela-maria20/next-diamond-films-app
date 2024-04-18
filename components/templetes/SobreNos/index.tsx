'use client'
import Link from 'next/link'
import { useState } from 'react'
import { FaYoutube } from 'react-icons/fa'

import Style from './SobreNos.module.scss'
import { Navigation, Pagination } from 'swiper/modules'

import { Model, Newsletter, Slide } from '@/components/molecules'
import useFilmeTextStatus from '@/utils/hooks/useFilmeTextStatus'
import { useFormatarData } from '@/utils/hooks/useFormatarData/formatarData'
import useIsMobile from '@/utils/hooks/useIsMobile/isMobile'
import { IFilmeResponse } from '@/utils/server/types'
import { SwiperOptions } from 'swiper/types'
interface ISobreNosProps {
  listaFilmes: {
    releases: Array<IFilmeResponse>
    streaming: Array<IFilmeResponse>
  }
}
const SobreNos = ({ listaFilmes }: ISobreNosProps) => {
  const [open, setOpen] = useState<boolean>(false)
  const [iframe, setIframe] = useState<IFilmeResponse>()

  const isMobile: boolean = useIsMobile()
  const { formatarData } = useFormatarData()
  const statusTextData = useFilmeTextStatus()
  const filmesSwiperOptions: SwiperOptions = {
    slidesPerView: 2,
    pagination: false,
    navigation: isMobile ? false : true,
    modules: [Navigation, Pagination],
    spaceBetween: 20,
    breakpoints: {
      640: {
        slidesPerView: 3,
        spaceBetween: 20
      },
      990: {
        slidesPerView: 5,
        spaceBetween: 10
      }
    }
  }
  function handleVerImagem(data: IFilmeResponse) {
    setOpen(true)
    setIframe(data)
  }
  return (
    <section className={Style.SobreNos}>
      <div className="container">
        <img src="/img/logo.webp" />
        <h1>SOBRE NÓS</h1>
        <p>
          A Diamond Films é uma distribuidora de cinema fundada em 2010, que se
          se destaca por ser responsável pela distribuição dos melhores filmes
          independentes da indústria cinematográfica. Atualmente, conta com uma
          rede de distribuição em sete países da América Latina: Argentina,
          Bolívia, Brasil, Chile, Colômbia, Peru e México. E, em 2016 entrou no
          mercado europeu, através de sua nova filial na Espanha.
        </p>
        <p>
          No Brasil, desde 2013, a Diamond distribuiu filmes como Antes da
          Meia-Noite, Bling Ring, Dragon Ball Z  A Batalha dos Deuses, O Mordomo
          da Casa Branca, Hércules 3D, O Jogo da Imitação, Para Sempre Alice, A
          Incrível História de Adaline, A Dama Dourada, Os Oito Odiados,
          Macbeth, Invasão a Londres e Memórias Secretas.
        </p>
        <hr />
        <h2 className={Style.titleOutline}>MISSÃO</h2>
        <p>
          Ser uma distribuidora que tem como melhor característica a qualidade
          de seus filmes, a partir de grandes produções e estrelas consagradas.
        </p>
        <h2 className={Style.titleOutline}>VISÃO</h2>
        <p>
          Ser reconhecida como líder no mercado de filmes independentes, sempre
          comprometidos com a sustentabilidade do negócio e com a satisfação de
          seus clientes.
        </p>
        <h2 className={Style.titleOutline}>VALORES</h2>
        <p>
          Enxergamos cada filme como um desafio único, para o qual destinamos
          uma atenção integral. Sempre com profissionalismo na distribuição e
          dedicação aos detalhes. Tudo isso sempre com muito respeito aos
          profissionais e clientes envolvidos
        </p>
        <hr />
        <h2>VOCÊ AMA CINEMA?</h2>
        <Newsletter
          isHorrizontal={!isMobile ? true : false}
          isBg={true}
          title={false}
        />
        <h2 className={Style.titleLancamento}>
          LANÇAMENTOS
          <span>
            Confira os filmes em exibição e os que serão lançados em breve
            somente nos cinemas.
          </span>
        </h2>
        <Slide.Content
          swiperOptions={filmesSwiperOptions}
          className={Style.slideFilmehomePromo}
        >
          {listaFilmes?.releases
            .sort(
              (a, b) =>
                new Date(a.releasedate).getTime() -
                new Date(b.releasedate).getTime()
            )
            .map((data) => (
              <div key={data.id} className={Style.filme}>
                <Link href={`/${data.slug}`}>
                  <img src={data.cover} alt={data.title} />
                </Link>
                <h3>
                  {data.title} - {formatarData(data?.releasedate)}
                </h3>
                <p>{statusTextData(data)}</p>
                <span
                  onClick={() => handleVerImagem(data)}
                  className={Style.tralher}
                >
                  <FaYoutube />
                  <span>Assista ao Trailer</span>
                </span>
              </div>
            ))}
        </Slide.Content>
        {open && (
          <Model.Root>
            <Model.Body
              setOpen={() => setOpen(!open)}
              className={Style.ModaliframeVideoYoutube}
            >
              <div className={Style.iframeVideoYoutube} key={iframe?.trailer}>
                <iframe
                  className={Style.embedResponsiveItem}
                  src={iframe?.trailer}
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
    </section>
  )
}

export default SobreNos
