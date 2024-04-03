import { Metadata } from 'next'
import { Suspense, lazy } from 'react'

import { Loading } from '@/components/atoms'
import { getHome } from '@/utils/server/requests'

const SobreNos = lazy(() => import('@/components/templetes/SobreNos'))

export const metadata: Metadata = {
  title: 'Sobre Nós | Diamond Films',
  description:
    'Saiba mais sobre a Diamond Films Brasil, uma distribuidora de filmes dedicada a trazer conteúdo de alta qualidade para o público brasileiro. Conheça nossa história, missão e valores.'
}

export default async function Page() {
  const listaFilmes = await getHome()
  return (
    <Suspense fallback={<Loading altura={true} />}>
      <SobreNos listaFilmes={listaFilmes} />
    </Suspense>
  )
}
