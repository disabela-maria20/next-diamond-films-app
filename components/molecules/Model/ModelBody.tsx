import { AiOutlineClose } from 'react-icons/ai'

import Style from './Model.module.scss'

interface IModelBodyProps {
  children: React.ReactNode
  setOpen(): void
  className?: string
}

const ModelBody: React.FC<IModelBodyProps> = ({
  children,
  setOpen,
  className
}) => {
  return (
    <div className={`${Style.modelBody} ${className}`}>
      {children}
      <button className={Style.modelBodyIconClose} onClick={setOpen}>
        <AiOutlineClose />
      </button>
    </div>
  )
}

export default ModelBody
