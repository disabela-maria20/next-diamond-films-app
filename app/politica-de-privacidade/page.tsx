import { Metadata } from 'next'
import { Suspense } from 'react'

import { Loading } from '@/components/atoms'
import { Footer } from '@/components/molecules'
import { Header } from '@/components/organisms'
import PoliticaDePrivacidade from '@/components/templetes/PoliticaDePrivacidade'

export const metadata: Metadata = {
  title: 'Diamond Films - Politica De Privacidade',
}

const pagePoliticaDePrivacidade = () => {
  return (
    <Suspense fallback={<Loading altura={true} />}>
      <>
        <Header />
        <PoliticaDePrivacidade />
        <Footer />
      </>
    </Suspense>
  )
}

export default pagePoliticaDePrivacidade
