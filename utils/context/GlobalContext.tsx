'use client'

import React, { createContext, useState } from 'react'

interface IModelContext {
  children: React.ReactNode
}

interface IContextType {
  preencher: boolean
  setPreencher: React.Dispatch<React.SetStateAction<boolean>>
}

export const GlobalContext = createContext<IContextType | null>(null)

export const GlobalStorage = ({ children }: IModelContext) => {
  const [preencher, setPreencher] = useState<boolean>(false)

  return (
    <GlobalContext.Provider value={{ preencher, setPreencher }}>
      {children}
    </GlobalContext.Provider>
  )
}
