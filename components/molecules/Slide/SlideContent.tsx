import Style from './Slide.module.scss'
import { FreeMode, Scrollbar } from 'swiper/modules'

import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/scrollbar'
import ReactPlayer from 'react-player'

interface ISlideContentProps {
  url: Array<string>
  isVideo: boolean
}

const SlideContent = ({ url, isVideo }: ISlideContentProps) => {
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
        {url.map((url: string) => (
          <SwiperSlide key={url}>
            {!isVideo && <img src={url} />}
            {isVideo && <ReactPlayer url={url} className={Style.slideVideo} />}
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

export default SlideContent
