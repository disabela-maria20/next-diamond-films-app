import { Metadata } from 'next'
import { Suspense, lazy } from 'react'

import { Loading } from '@/components/atoms'
import { Footer } from '@/components/molecules'
import { Header } from '@/components/organisms'
import { getBanner, getHome } from '@/utils/server/requests'

const ComprarIngresso = lazy(
  () => import('@/components/templetes/ComprarIngresso')
)

export const metadata: Metadata = {
  title: 'Diamond Films - Comprar Ingresso'
}

const pageComprarIngresso = async () => {
  const banner = await getBanner()

  const listaFilmes = await getHome()
  return (
    <Suspense fallback={<Loading altura={true} />}>
      <>
        <Header />
        <ComprarIngresso banner={banner.banners} listaFilmes={listaFilmes} />
        <Footer />
      </>
    </Suspense>
  )
}

export default pageComprarIngresso
