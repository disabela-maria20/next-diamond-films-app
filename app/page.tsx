import { Suspense } from 'react'

import { Loading } from '@/components/atoms'
import { Home } from '@/components/templetes'
import banner from '@/utils/server/json/Banner.json'
import { getHome } from '@/utils/server/requests'

export default async function PageHome() {
  const listaFilmes = await getHome()

  return (
    <Suspense fallback={<Loading altura={true} />}>
      <Home banner={banner} listaFilmes={listaFilmes} />
    </Suspense>
  )
}
