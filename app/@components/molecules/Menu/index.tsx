'use client'
import { useState } from 'react'

import Style from './Menu.module.scss'

import { Burger, Logo, Nav, Search } from '../../atoms'

const Menu = (): JSX.Element => {
  const [open, setOpen] = useState<boolean>(true)

  return (
    <>
      <div className={Style.bgNav}>
        <div className={Style.container}>
          <div className={Style.flexDeskTop}>
            <Nav open={open} setOpen={setOpen} />
            <div className={Style.flexMobile}>
              <Burger open={!open} setOpen={() => setOpen(!open)} />
              <Logo logo={'logo.webp'} />
              <Search />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Menu
