'use client'
import Link from 'next/link'
import { useState } from 'react'
import { FaYoutube } from 'react-icons/fa'

import Style from './SobreNos.module.scss'
import { Navigation, Pagination } from 'swiper/modules'

import { Loading } from '@/components/atoms'
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

  const { isMobile, isLoading } = useIsMobile()
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
  if (isLoading) return <Loading altura={true} />
  return (
    <section className={Style.SobreNos}>
      <div className="container">
        <img src="/img/logo.webp" alt="logo" width={300} height={200} />
        <h1>SOBRE NÓS</h1>
        <p>
          A Diamond Films é a maior distribuidora independente da América
          Latina. Fundada em 2010, se destaca por distribuir os melhores filmes
          independentes da indústria cinematográfica. Atualmente, a empresa atua
          em sete países da América Latina: Argentina, Bolívia, Brasil, Chile,
          Colômbia, Peru e México. No ano de 2016 começou a atuar no mercado
          europeu, por meio da sua filial na Espanha. No Brasil desde 2013, a
          Diamond Films distribuiu títulos como &lsquo;Os Oito Odiados&lsquo;;
          &lsquo;Lion - Uma Jornada para Casa&lsquo;, &lsquo;Moonlight - Sob a
          Luz do Luar&lsquo;, &lsquo;Green Book - O Guia&lsquo;, &lsquo;Moonfall
          – Ameaça Lunar&lsquo;, &lsquo;No Ritmo do Coração&lsquo;,
          &lsquo;Spencer&lsquo;, &lsquo;A Pior Pessoa do Mundo&lsquo;,
          &lsquo;Órfã 2: A Origem&lsquo;, &lsquo;One Piece Film Red’,
          &lsquo;Tudo em Todo o Lugar ao Mesmo Tempo&lsquo; e &lsquo;Fale
          Comigo’.
        </p>

        <hr />
        {/* <h2 className={Style.titleOutline}>MISSÃO</h2>
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
        <hr /> */}
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
            .reverse()
            .sort(
              (a, b) =>
                new Date(b.releasedate).getTime() -
                new Date(a.releasedate).getTime()
            )
            .map((data) => (
              <div key={data.id} className={Style.filme}>
                <Link href={`/${data.slug}`}>
                  <img
                    src={data.cover}
                    alt={data.title}
                    width={300}
                    height={200}
                  />
                </Link>
                <h2>{data.title}</h2>
                <span>Estreia: {formatarData(data?.releasedate)}</span>
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
