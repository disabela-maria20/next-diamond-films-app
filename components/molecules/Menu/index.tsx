'use client'
import { useEffect, useState } from 'react'

import Style from './Menu.module.scss'

import { Burger, Logo, Nav, Search } from '../../atoms'

import useIsMobile from '@/hooks/useIsMobile/isMobile'

const Menu = (): JSX.Element => {
  const [open, setOpen] = useState<boolean>(true)
  const isMobile: boolean = useIsMobile()

  useEffect(() => {
    if (!open) {
      document.body.classList.add(Style.bgOpacity)
    }
    if (open) {
      document.body.classList.remove(Style.bgOpacity)
    }
  }, [open])

  return (
    <>
      <div className={Style.bgNav}>
        <div className={Style.container}>
          <div className={Style.flexDeskTop}>
            <Nav open={open} setOpen={setOpen} />
            <div className={Style.flexMobile}>
              <Burger open={!open} setOpen={() => setOpen(!open)} />
              <Logo logo={'logo.webp'} />
              {isMobile && <Search />}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Menu
