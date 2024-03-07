'use client'

import React from 'react'

import { GlobalContext } from '../context/GlobalContext'

interface IProvidersProps {
  children: React.ReactNode
}
const Providers = ({ children }: IProvidersProps) => {
  return (
    <GlobalContext.Consumer>{() => <>{children}</>}</GlobalContext.Consumer>
  )
}

export default Providers
