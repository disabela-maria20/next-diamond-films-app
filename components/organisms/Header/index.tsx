'use client'

import Style from './Header.module.scss'

import { Menu } from '../../molecules/'

type Props = {
  children?: React.ReactNode
}

const Header = ({ children }: Props) => {
  return (
    <>
      <header className={Style.bg_header}>
        <Menu />
        {children}
      </header>
    </>
  )
}

export default Header
