'use client'

import Link from 'next/link'
import { FaFacebookF } from 'react-icons/fa'
import { FaYoutube } from 'react-icons/fa'
import { FaTiktok } from 'react-icons/fa'
import { FaInstagram } from 'react-icons/fa6'
import { FaXTwitter } from 'react-icons/fa6'

import Style from './RedesSociais.module.scss'

const RedesSociais: React.FC = () => {
  const navRedes = [
    {
      id: 0,
      name: 'facebook',
      icone: <FaFacebookF />,
      link: 'https://www.facebook.com/DiamondFilmsBR'
    },
    {
      id: 1,
      name: 'Instagram',
      icone: <FaInstagram />,
      link: 'https://www.instagram.com/diamondfilmsbr/'
    },
    {
      id: 2,
      name: 'Youtube',
      icone: <FaYoutube />,
      link: 'https://www.youtube.com/@DiamondFilmsBrasil'
    },
    {
      id: 3,
      name: 'Tiktok',
      icone: <FaTiktok />,
      link: 'https://www.tiktok.com/@diamondfilmsbr?lang=pt-BR'
    },
    {
      id: 4,
      name: 'Twitter',
      icone: <FaXTwitter />,
      link: 'https://twitter.com/DiamondFilmsBR'
    }
  ]

  return (
    <ul className={Style.redesSociais}>
      {navRedes.map((redes) => (
        <li key={redes.id}>
          <Link href={redes.link} aria-label={redes.name} target="_blank">
            <i>{redes.icone}</i>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default RedesSociais
