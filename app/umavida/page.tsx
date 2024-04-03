import { redirect } from 'next/navigation'
import { Metadata } from 'next/types'
import { Suspense } from 'react'

import { Loading } from '@/components/atoms'

export const metadata: Metadata = {
  title: 'Diamond Films - Uma Vida'
}
export default async function pageUmaVida() {
  const router = redirect(`https://diamondfilms.com.br/uma-vida/`)
  return <Suspense fallback={<Loading altura={true} />}>{router}</Suspense>
}
