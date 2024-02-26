interface ISlideTitle {
  children: React.ReactNode
}

const SlideTitle = ({ children }: ISlideTitle) => {
  return <h2>{children}</h2>
}

export default SlideTitle
