/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { FaYoutube } from 'react-icons/fa'

import Style from './Home.module.scss'
import { Navigation, Pagination } from 'swiper/modules'

import { Model, Newsletter, Slide } from '@/components/molecules'
import useIsMobile from '@/utils/hooks/useIsMobile/isMobile'
import { IFilmeResponse } from '@/utils/server/types'
import { SwiperOptions } from 'swiper/types'

import 'swiper/css/navigation'

interface IHomeProps {
  banner: Array<any>
  listaFilmes: {
    releases: Array<IFilmeResponse>
    streaming: Array<IFilmeResponse>
  }
}

const Home = ({ banner, listaFilmes }: IHomeProps) => {
  const [open, setOpen] = useState<boolean>(false)
  const isMobile: boolean = useIsMobile()

  const bannerSwiperOptions: SwiperOptions = {
    slidesPerView: 1,
    pagination: isMobile ? false : true,
    navigation: isMobile ? false : true,
    modules: [Navigation, Pagination]
  }

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

  const filmesStreaming: SwiperOptions = {
    slidesPerView: 2,
    pagination: false,
    spaceBetween: 20,
    navigation: isMobile ? false : true,
    modules: [Navigation, Pagination],
    breakpoints: {
      640: {
        slidesPerView: 3,
        spaceBetween: 20
      },
      768: {
        slidesPerView: 4,
        spaceBetween: 10
      },
      990: {
        slidesPerView: 5,
        spaceBetween: 10
      },
      1100: {
        slidesPerView: 6,
        spaceBetween: 10
      }
    }
  }

  return (
    <>
      <Slide.Content
        swiperOptions={bannerSwiperOptions}
        className={Style.slideBanner}
      >
        {banner?.map((data) => (
          <Link href={data.slug} key={data.id}>
            <img src={isMobile ? data.bannerMobile : data?.bannerDesktop} />
          </Link>
        ))}
      </Slide.Content>
      <div className="container">
        <Newsletter isBg={true} isHorrizontal={!isMobile && true} />
      </div>

      <section className={Style.areaSlideFilmes}>
        <div className="container" style={{ overflow: 'hidden' }}>
          <Slide.Title className={Style.slideTitle}>
            LANÇAMENTOS
            <span>
              Confira os filmes em exibição e os que serão lançados em breve
              somente nos cinemas.
            </span>
          </Slide.Title>
          <Slide.Content
            swiperOptions={filmesSwiperOptions}
            className={Style.slideFilmehomePromo}
          >
            {listaFilmes?.releases.map((data) => (
              <div key={data.id} className={Style.filme}>
                <Link href={`/catalogo/${data.slug}`}>
                  <img src={data.cover} />
                </Link>
                <h2>{data.title}</h2>
                <p>Em exibição nos cinemas</p>
                <a href={data.trailer} className={Style.tralher}>
                  <FaYoutube />
                  <span>Assista ao Trailer</span>
                </a>
              </div>
            ))}
          </Slide.Content>

          {/* <Slide.Title className={Style.slideTitle}>
            ASSISTA ONDE E QUANDO QUISER
            <span>Nossos filmes disponíveis nos streamings.</span>
          </Slide.Title>
          <Slide.Content
            swiperOptions={filmesStreaming}
            className={Style.slideFilmehomePromo}
          >
            {listaFilmes?.streaming?.map((data) => (
              <div key={data.id} className={Style.filme}>
                <Link href={`/catalogo/${data.slug}`}>
                  <img src={data.cover} />
                </Link>
                <h2>{data.title}</h2>
                <a href={data.trailer} className={Style.streaming}>
                  <span>Assista Agora</span>
                </a>
              </div>
            ))}
          </Slide.Content> */}
        </div>
      </section>
      {!open && (
        <Model.Root>
          <Model.Body setOpen={() => setOpen(!open)}>
            <Model.Title>VOCÊ ADORA UM BOM FILME?</Model.Title>
            <Model.Content>
              <Newsletter />
            </Model.Content>
            <Model.Footer />
          </Model.Body>
        </Model.Root>
      )}
    </>
  )
}

export default Home