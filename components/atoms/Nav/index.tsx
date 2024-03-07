/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import Style from './Nav.module.scss'

import { Logo, NavLink, RedesSociais, Search } from '..'

import useIsMobile from '@/utils/hooks/useIsMobile/isMobile'

interface NavProps {
  open: boolean
  setOpen?: (value: boolean) => void
}

const Nav: React.FC<NavProps> = ({ open, setOpen }) => {
  const isMobile: boolean = useIsMobile()
  return (
    <nav className={`${Style.navBar}`}>
      <div className={`${Style.NavArea} ${!open ? Style.open : Style.close}`}>
        <ul>
          <li className={Style.NomeMenu}>
            <span>Menu</span>
          </li>
          {/* <li className={Style.comprarIngressos}>
            <Link href="/comprar-ingressos">COMPRAR INGRESSOS</Link>
          </li> */}
          <NavLink area="menu" setOpen={setOpen} open={open} />
          <li className={Style.logo}>
            <Logo logo="logo-BRANCO.png" />
          </li>
        </ul>
        <RedesSociais />
        {/* {!isMobile && <Search />} */}
      </div>
    </nav>
  )
}

export default Nav
