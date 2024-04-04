/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

import Style from './Menu.module.scss'

import { Burger, Loading, Logo, Nav, Search } from '../../atoms'

import useIsMobile from '@/utils/hooks/useIsMobile/isMobile'

const Menu = (): JSX.Element => {
  const [open, setOpen] = useState<boolean>(true)
  const { isMobile, isLoading } = useIsMobile()

  useEffect(() => {
    if (!open) {
      document.body.classList.add(Style.bgOpacity)
    }
    if (open) {
      document.body.classList.remove(Style.bgOpacity)
    }
  }, [open])
  if (isLoading) return <Loading />
  return (
    <>
      <div className={Style.bgNav}>
        <div className={Style.container}>
          <div className={Style.flexDeskTop}>
            <Nav open={open} setOpen={setOpen} />
            <div className={Style.flexMobile}>
              <Burger open={!open} setOpen={() => setOpen(!open)} />
              <Link href="/">
                <Logo logo={'logo.webp'} />
              </Link>
              {/* {isMobile && <Search />} */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Menu
