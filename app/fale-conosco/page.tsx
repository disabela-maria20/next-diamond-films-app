import { Metadata } from 'next'
import { Suspense, lazy } from 'react'

import { Loading } from '@/components/atoms'
import { Footer } from '@/components/molecules'
import { Header } from '@/components/organisms'

const Contato = lazy(() => import('@/components/templetes/Contato'))

export const metadata: Metadata = {
  title: 'Diamond Films - Fale Conosco',
  description:
    'Tem alguma dúvida sobre nossos filmes ou está interessado em parcerias? Entre em contato com a Diamond Films Brasil para obter mais informações. Estamos aqui para ajudar!'
}
export default function Page() {
  return (
    <Suspense fallback={<Loading altura={true} />}>
      <>
        <Header />
        <Contato />
        <Footer />
      </>
    </Suspense>
  )
}
