import { Metadata } from 'next'
import { unstable_cache } from 'next/cache'
import { Suspense, lazy } from 'react'

import { Loading } from '@/components/atoms'
import { getHome } from '@/utils/server/requests'

const Catalogo = lazy(() => import('@/components/templetes/Catalogo'))

const getPageFilmes = unstable_cache(async () => getHome(), ['filme'])

export const metadata: Metadata = {
  title: 'Filmes | Diamond Films',
  description:
    'Explore nosso catálogo de filmes diversificado, incluindo os mais recentes lançamentos e clássicos imperdíveis. Encontre informações detalhadas sobre cada filme e descubra o que está em cartaz.'
}

const PageFilmes = async () => {
  const listaFilmes = await getPageFilmes()
  return (
    <Suspense fallback={<Loading altura={true} />}>
      <Catalogo listaFilmes={listaFilmes} />
    </Suspense>
  )
}

export default PageFilmes
