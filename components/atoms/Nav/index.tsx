'use client'

import Link from 'next/link'

import Style from './Nav.module.scss'

import { Logo, RedesSociais, Search } from '..'

import useIsMobile from '@/hooks/isMobile'

interface NavProps {
  open: boolean
  setOpen?: (value: boolean) => void
}

const Nav: React.FC<NavProps> = ({ open }) => {
  const isMobile: boolean = useIsMobile()
  const navLink = [
    { nome: 'home', link: '/' },
    { nome: 'catálogo', link: 'catalogo' },
    { nome: 'Em Breve', link: 'em-breve' },
    { nome: 'contato', link: 'contato' }
  ]

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
          {navLink.map((link) => (
            <li key={link.link}>
              <Link href={link.link}>{link.nome}</Link>
            </li>
          ))}
          <div className={Style.logo}>
            <Logo logo="logo-BRANCO.png" />
          </div>
        </ul>
        <RedesSociais />
        {!isMobile && <Search />}
      </div>
    </nav>
  )
}

export default Nav
