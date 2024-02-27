'use client'

import Link from 'next/link'

const LINK = [
  { nome: 'home', link: '/', menu: true, footer: true },
  { nome: 'catálogo', link: '/catalogo', menu: true, footer: true },
  { nome: 'Em Breve', link: '/em-breve', menu: true, footer: true },
  { nome: 'contato', link: '/contato', menu: true, footer: true },
  { nome: 'Termos de Uso', link: '/termos-de-uso', menu: false, footer: true },
  {
    nome: 'Política de Privacidade',
    link: '/politica-de-privacidade',
    menu: false,
    footer: true
  }
]

type Area = 'menu' | 'footer'

interface NavLinkProps {
  area: Area
}

const NavLink = ({ area = 'menu' }: NavLinkProps) => {
  const filteredLinks = LINK.filter((link) => {
    if (area == 'menu') return link.menu
    if (area == 'footer') return link.footer
  })

  return (
    <ul>
      {filteredLinks.map((link) => (
        <li key={link.link}>
          <Link href={link.link}>{link.nome}</Link>
        </li>
      ))}
    </ul>
  )
}

export default NavLink
