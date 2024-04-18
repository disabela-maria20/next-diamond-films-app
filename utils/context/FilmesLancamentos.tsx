'use client'
import React, { useState, createContext, useContext, ReactNode } from 'react'

import { IFilmeResponse } from '../server/types'

import axios from 'axios'

interface ContextValue {
  data: IFilmeResponse | undefined
  setSlug: (slug: string) => void
}

const FilmesLancamentosContext = createContext<ContextValue | null>(null)

export const FilmesLancamentosProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const [data, setData] = useState<IFilmeResponse>()

  const setSlug = (slug: string) => {
    axios
      .get<IFilmeResponse>(`/movie/get/${slug}`)
      .then((response) => {
        setData(response.data)
      })
      .catch((error) => {
        console.error('Erro na requisição:', error)
      })
  }

  const contextValue: ContextValue = { data, setSlug }

  return (
    <FilmesLancamentosContext.Provider value={contextValue}>
      {children}
    </FilmesLancamentosContext.Provider>
  )
}

export const useFilmesLancamentos = (): ContextValue | null =>
  useContext(FilmesLancamentosContext)
