import { Suspense } from 'react'

import Home from '@/components/templetes/Home'
import banner from '@/utils/server/json/Banner.json'
import { getHome } from '@/utils/server/requests'
export default async function PageHome() {
  const listaFilmes = await getHome()

  return (
    <Suspense fallback="Carregando...">
      <Home banner={banner} listaFilmes={listaFilmes} />
    </Suspense>
  )
}
