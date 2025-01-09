import { Metadata } from 'next'
import { Suspense } from 'react'

import { Loading } from '@/components/atoms'
import { Footer } from '@/components/molecules'
import { Header } from '@/components/organisms'
import TermosCondicoes from '@/components/templetes/TermosCondicoes'

export const metadata: Metadata = {
  title: 'Termos Condicoes | Diamond Films',
}

const pageTermosCondicoes = () => {
  return (
    <Suspense fallback={<Loading altura={true} />}>
      <>
        <Header />
        <TermosCondicoes />
        <Footer />
      </>
    </Suspense>
  )
}

export default pageTermosCondicoes
