import ReactPlayer from 'react-player'

import Style from './Slide.module.scss'
import { FreeMode, Scrollbar } from 'swiper/modules'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/scrollbar'
import { SwiperOptions } from 'swiper/types'

interface IFilmeResponseUrl {
  url: string
}

interface ISlideContentProps {
  url: Array<IFilmeResponseUrl>
  isVideo: boolean
  breakpoints?: IBreakpoints
  scrollbar?: { hide?: boolean }
}

interface IBreakpoints {
  [width: number]: SwiperOptions
  [ratio: string]: SwiperOptions
}

const defaultBreakpoints: IBreakpoints = {
  640: {
    slidesPerView: 2,
    spaceBetween: 20
  },
  768: {
    slidesPerView: 3,
    spaceBetween: 10
  }
}

const SlideContent = ({
  url,
  isVideo,
  breakpoints = defaultBreakpoints,
  scrollbar = { hide: true }
}: ISlideContentProps) => {
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
        scrollbar={scrollbar}
        modules={[FreeMode, Scrollbar]}
        breakpoints={breakpoints}
      >
        {url?.map((url, i) => (
          <SwiperSlide key={i}>
            {!isVideo && <img src={`${url.url}`} alt={`Slide ${i}`} />}
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
