'use client'
import { CgSearch } from 'react-icons/cg'

import Style from './Search.module.scss'

const Search: React.FC = () => {
  return (
    <button aria-label="Pesquisar" className={Style.btnPesquisar}>
      <CgSearch />
    </button>
  )
}

export default Search
