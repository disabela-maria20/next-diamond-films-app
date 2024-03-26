import { Metadata } from 'next'
import { Suspense } from 'react'

import { Loading } from '@/components/atoms'
import Catalogo from '@/components/templetes/Catalogo'
import { getHome } from '@/utils/server/requests'

export const metadata: Metadata = {
  title: 'Diamond Films - Filmes'
}

const PageFilmes = async () => {
  const listaFilmes = await getHome()
  return (
    <Suspense fallback={<Loading altura={true} />}>
      <Catalogo listaFilmes={listaFilmes} />
    </Suspense>
  )
}

export default PageFilmes
