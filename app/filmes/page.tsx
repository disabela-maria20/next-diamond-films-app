import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

import { Loading } from '@/components/atoms'
import { getHome } from '@/utils/server/requests'

export const metadata: Metadata = {
  title: 'Diamond Films - Filmes'
}
const Catalogo = dynamic(() => import('@/components/templetes/Catalogo'))

const PageFilmes = async () => {
  const listaFilmes = await getHome()
  return (
    <Suspense fallback={<Loading altura={true} />}>
      <Catalogo listaFilmes={listaFilmes} />
    </Suspense>
  )
}

export default PageFilmes
