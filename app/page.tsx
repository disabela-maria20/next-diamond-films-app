import { Suspense, lazy } from 'react'

import { Loading } from '@/components/atoms'
import banner from '@/utils/server/json/Banner.json'
import { getHome } from '@/utils/server/requests'
const Home = lazy(() => import('@/components/templetes/Home'))

export default async function PageHome() {
  const listaFilmes = await getHome()
  return (
    <Suspense fallback={<Loading altura={true} />}>
      <Home banner={banner} listaFilmes={listaFilmes} />
    </Suspense>
  )
}
