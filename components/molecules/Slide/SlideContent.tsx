/* eslint-disable @typescript-eslint/no-explicit-any */
import ReactPlayer from 'react-player'

import Style from './Slide.module.scss'
import { FreeMode, Scrollbar } from 'swiper/modules'

import { IFilmeResponseUrl } from '@/server/types'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/scrollbar'

interface ISlideContentProps {
  url: Array<IFilmeResponseUrl>
  isVideo: boolean
}

const SlideContent = ({ url, isVideo }: ISlideContentProps) => {
  console.log(url?.map((data) => data.url))

  return (
    <section className={Style.slideContent}>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        freeMode={true}
        pagination={{
          clickable: true
        }}
        scrollbar={{
          hide: true
        }}
        modules={[FreeMode, Scrollbar]}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 10
          }
        }}
      >
        {url?.map((url, i) => (
          <SwiperSlide key={i}>
            {!isVideo && <img src={`${url.url}`} />}
            {isVideo && (
              <ReactPlayer url={`${url.url}`} className={Style.slideVideo} />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

export default SlideContent
