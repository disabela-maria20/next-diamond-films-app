import Style from './Slide.module.scss'

interface ISlideTitle {
  children: React.ReactNode
}

const SlideTitle = ({ children }: ISlideTitle) => {
  return <h2 className={Style.slideTitle}>{children}</h2>
}

export default SlideTitle
