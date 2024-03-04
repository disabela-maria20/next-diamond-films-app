import Style from './Model.module.scss'

import { Logo } from '@/components/atoms'

const ModelFooter = () => {
  return (
    <div className={Style.modelFooter}>
      <Logo logo="logo-BRANCO.png" />
    </div>
  )
}

export default ModelFooter
