'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import Style from './Nav.module.scss'

interface NavProps {
  open: boolean
  setOpen?: (value: boolean) => void
}

const Nav: React.FC<NavProps> = (open) => {
  const pathname = usePathname()

  const navLink = [
    { nome: 'catálogo', link: 'catalogo' },
    { nome: 'Notícias', link: 'noticias' },
    { nome: 'contato', link: 'contato' }
  ]

  return (
    <nav className={`${Style.navBar}`}>
      <div className={`${!open ? Style.open : Style.close}`}>
        <ul>
          {navLink.map((link) => (
            <li
              key={link.link}
              className={`${pathname === link.link ? Style.active : ''}`}
            >
              <Link href={link.link}>{link.nome}</Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default Nav
