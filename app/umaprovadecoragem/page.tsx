import { redirect } from 'next/navigation'
import { Metadata } from 'next/types'
import { Suspense } from 'react'

import { Loading } from '@/components/atoms'

export const metadata: Metadata = {
  title: 'Diamond Films - Uma Prova de Coragem'
}
export default async function pageProvaDeCoragem() {
  const router = redirect(`https://diamondfilms.com.br/uma-prova-de-coragem/`)
  return <Suspense fallback={<Loading altura={true} />}>{router}</Suspense>
}
