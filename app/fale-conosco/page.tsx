import { Metadata } from 'next'
import { Suspense } from 'react'

import { Loading } from '@/components/atoms'
import Contato from '@/components/templetes/Contato'
export const metadata: Metadata = {
  title: 'Diamond Films - Fale Conosco'
}
export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <Contato />
    </Suspense>
  )
}
