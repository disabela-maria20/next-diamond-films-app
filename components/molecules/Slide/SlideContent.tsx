/* eslint-disable @typescript-eslint/no-explicit-any */
import { FreeMode, Scrollbar } from 'swiper/modules'

import { Swiper } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/scrollbar'

interface ISlideContentProps {
  children: React.ReactNode[]
}

const SlideContent = ({ children }: ISlideContentProps) => {
  return (
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
      // centeredSlides={true}
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
      {children}
    </Swiper>
  )
}

export default SlideContent
