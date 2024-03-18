'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { IoSearchSharp } from 'react-icons/io5'

import Style from './Catalogo.module.scss'

import { useFormatarData } from '@/utils/hooks/useFormatarData/formatarData'
import { IFilmeResponse } from '@/utils/server/types'

interface ICatalogoProps {
  listaFilmes: {
    releases: Array<IFilmeResponse>
    streaming: Array<IFilmeResponse>
  }
}

const Catalogo: React.FC<ICatalogoProps> = ({ listaFilmes }) => {
  const [filtroGenero, setFiltroGenero] = useState('')
  const [filtroAno, setFiltroAno] = useState<number | undefined>(undefined)
  const [pesquisa, setPesquisa] = useState('')
  const [filtroAlfabeto, setFiltroAlfabeto] = useState('')

  const { formatAno } = useFormatarData()

  const handleGeneroChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFiltroGenero(event.target.value)
  }

  const handleAnoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const novoAno = parseInt(event.target.value)
    setFiltroAno(novoAno)
  }

  const handlePesquisaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPesquisa(event.target.value)
  }

  const handleFiltroAlfabeto = (letra: string) => {
    setFiltroAlfabeto(letra)
  }

  const filtrarFilmes = (filme: IFilmeResponse) => {
    if (filtroGenero && filme.genre !== filtroGenero) {
      return false
    }
    if (filtroAno && formatAno(filme.releasedate) !== filtroAno) {
      return false
    }
    if (
      pesquisa &&
      !filme.title.toLowerCase().includes(pesquisa.toLowerCase())
    ) {
      return false
    }
    if (filtroAlfabeto === '#' && !isNaN(parseInt(filme.title.charAt(0)))) {
      return true
    }
    if (
      filtroAlfabeto &&
      filme.title.charAt(0).toUpperCase() !== filtroAlfabeto
    ) {
      return false
    }
    if (filtroAno === 2024 && formatAno(filme.releasedate) !== 2024) {
      return false
    }
    return true
  }

  return (
    <section className={Style.catalogo}>
      <div className="container">
        <h1>Filmes</h1>
        <div className={Style.gridCatalogo}>
          <select value={filtroGenero} onChange={handleGeneroChange}>
            <option value="">Gênero</option>
            {listaFilmes.releases.map((data) => (
              <option key={data.id} value={data.genre}>
                {data.genre}
              </option>
            ))}
          </select>
          <select value={filtroAno || ''} onChange={handleAnoChange}>
            <option value="">Ano</option>
            {Array.from(
              { length: new Date().getFullYear() - 1969 },
              (_, index) => (
                <option key={index} value={new Date().getFullYear() - index}>
                  {new Date().getFullYear() - index}
                </option>
              )
            )}
          </select>
          <div className={Style.areaPesquisarCatalogo}>
            <input
              type="text"
              placeholder="Pesquisar nome..."
              value={pesquisa}
              onChange={handlePesquisaChange}
            />
            <button>
              <IoSearchSharp />
            </button>
          </div>
        </div>
        <div className={Style.gridFiltroAlfabeto}>
          <button onClick={() => handleFiltroAlfabeto('')}>
            <strong>TUDO</strong>
          </button>
          <button onClick={() => handleFiltroAlfabeto('#')}>#</button>
          {Array.from({ length: 26 }, (_, index) => (
            <button
              key={index}
              onClick={() =>
                handleFiltroAlfabeto(String.fromCharCode(65 + index))
              }
            >
              {String.fromCharCode(65 + index)}
            </button>
          ))}
        </div>
        <div className={Style.areaTitleCatalogoFilmeAno}>
          <h2>2024</h2> <span>Até o momento e em ordem de lançamento.</span>
        </div>
        <div className={Style.gridFilmesCatalogo}>
          {listaFilmes?.releases.filter(filtrarFilmes).map((data) => (
            <div key={data.id}>
              <Link href={`/${data.slug}`}>
                <img src={data.cover} alt={data.title} />
                <h2>{data.title}</h2>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Catalogo
