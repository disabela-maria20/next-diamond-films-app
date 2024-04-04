import { redirect } from 'next/navigation'
import { Metadata } from 'next/types'

import { Loading } from '@/components/atoms'

export const metadata: Metadata = {
  title: 'Diamond Films - Uma Prova de Coragem'
}
export default async function pageProvaDeCoragem() {
  const router = redirect(`https://diamondfilms.com.br/uma-prova-de-coragem/`)
  return (
    <>
      <Loading altura={true} />
      {router}
    </>
  )
}
