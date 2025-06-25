import lazy from 'next/dynamic'
import { Suspense } from 'react'

import { Loading } from '@/components/atoms'
import { Footer } from '@/components/molecules'
import { Header } from '@/components/organisms'
import { getBanner, getHome } from '@/utils/server/requests'

const Home = lazy(() => import('@/components/templetes/Home'), {
  ssr: false,
  loading: () => <Loading altura={true} />
})

export default async function PageHome() {
  const banner = await getBanner()
  const listaFilmes = await getHome()
  return (
    <Suspense fallback={<Loading altura={true} />}>
      <Header />
      <Home banner={banner.banners} listaFilmes={listaFilmes} />
      <Footer />
    </Suspense>
  )
}
