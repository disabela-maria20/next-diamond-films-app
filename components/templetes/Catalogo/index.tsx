'use client'
import React, { useState } from 'react'
import { IoSearchSharp } from 'react-icons/io5'

import Style from './Catalogo.module.scss'
import { CardFilme } from '@/components/molecules'
import { useFormatarData } from '@/utils/hooks/useFormatarData/formatarData'
import { useGtag } from '@/utils/lib/gtag'
import { IFilmeResponse } from '@/utils/server/types'

interface ICatalogoProps {
  listaFilmes: {
    releases: Array<IFilmeResponse>
    streaming: Array<IFilmeResponse>
  }
}

const Catalogo: React.FC<ICatalogoProps> = ({ listaFilmes }) => {
  const [filtroGenero, setFiltroGenero] = useState<string>('')
  const [filtroAno, setFiltroAno] = useState<string>('')
  const [pesquisa, setPesquisa] = useState<string>('')
  const [ultimaPesquisa, setUltimaPesquisa] = useState<string>('') // Estado adicional para o título
  const [filtroPesquisa, setFiltroPesquisa] = useState<IFilmeResponse[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { formatAno } = useFormatarData()
  const lancamento = listaFilmes.releases
  const streaming = listaFilmes.streaming
  const concatFilmes = lancamento.concat(streaming)

  const { dataLayerMovieFilter } = useGtag()

  const handlePesquisa = () => {
    setIsLoading(true)
    setUltimaPesquisa(pesquisa) // Atualiza a última pesquisa
    const filmesPesquisados = concatFilmes.filter(ItemPesquisados)
      setFiltroPesquisa(filmesPesquisados)
      setIsLoading(false)
      dataLayerMovieFilter('Filmes | Diamond Film', 'filmes', '', ultimaPesquisa, 0);

  }

  const ItemPesquisados = (filme: IFilmeResponse) => {
    return filme.title.toLowerCase().includes(pesquisa.toLowerCase())
  }

  const filtrarFilmes = (filme: IFilmeResponse) => {
    if (filtroPesquisa.length > 0 && !filtroPesquisa.includes(filme)) {
      return false
    }
    if (filtroGenero && filme.genre !== filtroGenero) {
      return false
    }
    if (filtroAno && formatAno(filme.releasedate) !== parseInt(filtroAno)) {
      return false
    }
    return true
  }

  return (
    <section className={Style.catalogo}>
      <div className="container">
        <h1>Filmes</h1>
        <div className={Style.gridCatalogo}>
          <select value={filtroGenero} onChange={(e) => setFiltroGenero(e.target.value)}>
            <option value="">Gênero</option>
            {Array.from(new Set(concatFilmes.map((data) => data.genre))).map(
              (genre, index) => (
                <option key={index} value={genre}>
                  {genre}
                </option>
              )
            )}
          </select>
          <select value={filtroAno} onChange={(e) => setFiltroAno(e.target.value)}>
            <option value="">Ano</option>
            {Array.from(
              { length: new Date().getFullYear() - 2023 },
              (_, index) => (
                <option
                  key={index}
                  value={(new Date().getFullYear() - index).toString()}
                >
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
              onChange={({ target }) => setPesquisa(target.value)}
            />
            <button onClick={handlePesquisa}>
              <IoSearchSharp />
            </button>
          </div>
        </div>
        {isLoading ? (
          <p className={Style.Carregando}>Carregando...</p>
        ) : (
          <div>
            {(filtroPesquisa.length > 0 ||
              concatFilmes.filter(filtrarFilmes).length > 0) && (
              <>
                <div className={Style.areaTitleCatalogoFilmeAno}>
                  <h2>
                    {filtroGenero
                      ? `Gênero: ${filtroGenero}`
                      : filtroAno
                      ? `Ano: ${filtroAno}`
                      : ultimaPesquisa
                      ? `Todos os resultados de: ${ultimaPesquisa}`
                      : 'TUDO'}
                  </h2>
                  <span></span>
                </div>
                <div className={Style.gridFilmesCatalogo}>
                  {(filtroPesquisa.length > 0
                    ? filtroPesquisa
                    : concatFilmes.filter(filtrarFilmes)
                  )
                    .sort(
                      (a, b) =>
                        new Date(b.releasedate).getTime() -
                        new Date(a.releasedate).getTime()
                    )
                    .map((data) => (
                      <div key={data.id}>
                        <CardFilme data={data} slide="catalogo" />
                      </div>
                    ))}
                </div>
              </>
            )}
            {filtroPesquisa.length === 0 &&
              concatFilmes.filter(filtrarFilmes).length === 0 && (
                <p className={Style.CatalogoVazio}>Nenhum filme encontrado</p>
              )}
          </div>
        )}
      </div>
    </section>
  )
}

export default Catalogo
