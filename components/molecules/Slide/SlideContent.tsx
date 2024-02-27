import Style from './Slide.module.scss'
import { FreeMode, Scrollbar } from 'swiper/modules'

import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/scrollbar'

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
            {isVideo && (
              <iframe
                width="560"
                height="315"
                src={`${url}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className={Style.slideVideo}
              ></iframe>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

export default SlideContent
