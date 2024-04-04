import { redirect } from 'next/navigation'
import { Metadata } from 'next/types'

import { Loading } from '@/components/atoms'

export const metadata: Metadata = {
  title: 'Diamond Films - Uma Vida'
}
export default async function pageUmaVida() {
  const router = redirect(`https://diamondfilms.com.br/uma-vida/`)

  return (
    <>
      <Loading altura={true} />
      {router}
    </>
  )
}
