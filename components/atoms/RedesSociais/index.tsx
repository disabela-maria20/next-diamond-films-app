'use client'

import Link from 'next/link'
import { FaFacebookF } from 'react-icons/fa'
import { FaYoutube } from 'react-icons/fa'
import { FaTiktok } from 'react-icons/fa'
import { FaInstagram } from 'react-icons/fa6'
import { FaXTwitter } from 'react-icons/fa6'

import Style from './RedesSociais.module.scss'

const Search: React.FC = () => {
  const navRedes = [
    { id: 0, name: 'facebook', icone: <FaFacebookF />, link: '' },
    { id: 1, name: 'Instagram', icone: <FaInstagram />, link: '' },
    { id: 2, name: 'Youtube', icone: <FaYoutube />, link: '' },
    { id: 3, name: 'Tiktok', icone: <FaTiktok />, link: '' },
    { id: 4, name: 'Twitter', icone: <FaXTwitter />, link: '' }
  ]

  return (
    <ul className={Style.redesSociais}>
      {navRedes.map((redes) => (
        <li key={redes.id}>
          <Link href={redes.link} aria-label={redes.name}>
            <i>{redes.icone}</i>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default Search
