import { SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/scrollbar'

interface ISlideItemProps {
  children: React.ReactNode
}

const SlideItem = ({ children }: ISlideItemProps) => {
  return <SwiperSlide>{children}</SwiperSlide>
}

export default SlideItem
