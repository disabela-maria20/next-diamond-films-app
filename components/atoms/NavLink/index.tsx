'use client'

import Link from 'next/link'

const LINK = [
  {
    nome: 'comprar ingresso',
    link: '/comprar-ingressos',
    menu: false,
    footer: false
  },
  { nome: 'home', link: '/', menu: false, footer: false },
  {
    nome: 'Filmes',
    link: '/filmes',
    menu: false,
    footer: false
  },
  { nome: 'contato', link: '/fale-conosco', menu: false, footer: false },
  {
    nome: 'sobre nós',
    link: '/sobre-nos',
    menu: false,
    footer: false
  },

  { nome: 'Em Breve', link: '/em-breve', menu: false, footer: false },
  { nome: 'contato', link: '/contato', menu: false, footer: false },
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
  open?: boolean
  setOpen?: (value: boolean) => void | undefined
}

const NavLink = ({ area = 'menu', setOpen, open }: NavLinkProps) => {
  const filteredLinks = LINK.filter((link) => {
    if (area == 'menu') return link.menu
    if (area == 'footer') return link.footer
  })

  return (
    <>
      {filteredLinks.map((link) => (
        <li key={link.link}>
          <Link href={link.link} onClick={() => setOpen && setOpen(!open)}>
            {link.nome}
          </Link>
        </li>
      ))}
    </>
  )
}

export default NavLink
