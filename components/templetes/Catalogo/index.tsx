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
    releases: IFilmeResponse[]
    streaming: IFilmeResponse[]
  }
}

const Catalogo: React.FC<ICatalogoProps> = ({ listaFilmes }) => {
  const [filtroGenero, setFiltroGenero] = useState<string>('')
  const [filtroAno, setFiltroAno] = useState<string>('')
  const [pesquisa, setPesquisa] = useState<string>('')
  const [resultadosPesquisa, setResultadosPesquisa] = useState<IFilmeResponse[]>([])
  const [titulo, setTitulo] = useState<string>('TUDO')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { formatAno } = useFormatarData()
  const { dataLayerMovieFilter } = useGtag()

  const todosOsFilmes = [...listaFilmes.releases, ...listaFilmes.streaming]

  const handleBuscar = () => {
    setIsLoading(true)

    const filmesFiltrados = todosOsFilmes.filter((filme) =>
      filme.title.toLowerCase().includes(pesquisa.toLowerCase())
    )
    setResultadosPesquisa(filmesFiltrados)
    atualizarTitulo(filmesFiltrados)
    setIsLoading(false) // Simula um pequeno atraso
  }

  const atualizarTitulo = (filmes: IFilmeResponse[]) => {
    if (filmes.length === 0) {
      setTitulo('Nenhum resultado encontrado');
      dataLayerMovieFilter('Filmes | Diamond Film', 'filmes', '', 'Nenhum resultado encontrado', 0);
      return;
    }

    const tituloAtualizado =
      filtroGenero ? `Gênero: ${filtroGenero}` :
        filtroAno ? `Ano: ${filtroAno}` :
          pesquisa ? `Resultados para: "${pesquisa}"` :
            'TUDO';

    dataLayerMovieFilter('Filmes | Diamond Film', 'filmes', '', tituloAtualizado, 0);

    setTitulo(tituloAtualizado);
  };


  const filtrarFilmes = (filme: IFilmeResponse) => {
    if (filtroGenero && filme.genre !== filtroGenero) return false
    if (filtroAno && formatAno(filme.releasedate) !== parseInt(filtroAno)) return false
    return true
  }

  return (
    <section className={Style.catalogo}>
      <div className="container">
        <h1>Filmes</h1>

        {/* Filtros */}
        <div className={Style.gridCatalogo}>
          <select value={filtroGenero} onChange={(e) => setFiltroGenero(e.target.value)}>
            <option value="">Gênero</option>
            {Array.from(new Set(todosOsFilmes.map((filme) => filme.genre))).map((genre, index) => (
              <option key={index} value={genre}>
                {genre}
              </option>
            ))}
          </select>
          <select value={filtroAno} onChange={(e) => setFiltroAno(e.target.value)}>
            <option value="">Ano</option>
            {Array.from(
              { length: new Date().getFullYear() - 2023 },
              (_, index) => (
                <option key={index} value={(new Date().getFullYear() - index).toString()}>
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
              onChange={(e) => setPesquisa(e.target.value)}
            />
            <button onClick={handleBuscar}>
              <IoSearchSharp />
            </button>
          </div>
        </div>

        {isLoading ? (
          <p className={Style.Carregando}>Carregando...</p>
        ) : (
          <div>
            <div className={Style.areaTitleCatalogoFilmeAno}>
              <h2>{titulo}</h2>
              <span></span>
            </div>

            <div className={Style.gridFilmesCatalogo}>
              {(resultadosPesquisa.length > 0
                ? resultadosPesquisa
                : todosOsFilmes.filter(filtrarFilmes)
              )
                .sort(
                  (a, b) =>
                    new Date(b.releasedate).getTime() - new Date(a.releasedate).getTime()
                )
                .map((filme) => (
                  <div key={filme.id}>
                    <CardFilme data={filme} slide="catalogo" />
                  </div>
                ))}
            </div>

            {resultadosPesquisa.length === 0 &&
              todosOsFilmes.filter(filtrarFilmes).length === 0 && (
                <p className={Style.CatalogoVazio}>Nenhum filme encontrado</p>
              )}
          </div>
        )}
      </div>
    </section>
  )
}

export default Catalogo
