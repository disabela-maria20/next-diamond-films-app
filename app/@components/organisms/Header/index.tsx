'use client'
import { usePathname } from 'next/navigation'

import Style from './Header.module.scss'

import { Menu } from '../../molecules/'

type Props = {
  children?: React.ReactNode
}

const Header = ({ children }: Props) => {
  const pathname = usePathname()

  const verificarHome = pathname != '/' ? true : false

  return (
    <>
      <header
        className={Style.bg_header}
        style={{ backgroundPositionY: verificarHome ? 'center' : 'bottom' }}
      >
        <Menu />
        {children}
      </header>
      {verificarHome && <div className={Style.border}></div>}
    </>
  )
}

export default Header
