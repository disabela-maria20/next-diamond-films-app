/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react'
import { SwiperOptions } from 'swiper/types'

import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/scrollbar'
import { Loading } from '@/components/atoms'

interface CustomSwiperProps {
  swiperOptions: SwiperOptions
  children: React.ReactNode
  className?: string
}

const SlideContent: React.FC<CustomSwiperProps> = ({
  children,
  swiperOptions,
  className
}) => {
  const [swiper, setSwiper] = useState<boolean>(true)
  const swiperElRef = useRef(null)
  useEffect(() => {
    if (!swiperElRef) {
      setSwiper(true)
    } else {
      setSwiper(false)
    }

    // listen for Swiper events using addEventListener
  }, [])
  if (swiper) {
    return <Loading />
  }
  return (
    <Swiper ref={swiperElRef} {...swiperOptions} className={className}>
      {React.Children.map(children, (child, index) => (
        <SwiperSlide key={index}>{child}</SwiperSlide>
      ))}
    </Swiper>
  )
}

export default SlideContent
