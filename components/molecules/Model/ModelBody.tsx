import { AiOutlineClose } from 'react-icons/ai'

import Style from './Model.module.scss'

interface IModelBodyProps {
  children: React.ReactNode
  setOpen(): void
}

const ModelBody: React.FC<IModelBodyProps> = ({ children, setOpen }) => {
  return (
    <div className={Style.modelBody}>
      {children}
      <button className={Style.modelBodyIconClose} onClick={setOpen}>
        <AiOutlineClose />
      </button>
    </div>
  )
}

export default ModelBody
