import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

import { Loading } from '@/components/atoms'
import { Footer } from '@/components/molecules'
import { Header } from '@/components/organisms'
import { getHome } from '@/utils/server/requests'

const SobreNos = dynamic(() => import('@/components/templetes/SobreNos'), {
  ssr: false
})

export const metadata: Metadata = {
  title: 'Sobre Nós | Diamond Films',
  description:
    'Saiba mais sobre a Diamond Films Brasil, uma distribuidora de filmes dedicada a trazer conteúdo de alta qualidade para o público brasileiro. Conheça nossa história, missão e valores.'
}

export default async function Page() {
  const listaFilmes = await getHome()
  return (
    <Suspense fallback={<Loading altura={true} />}>
      <>
        <Header />
        <SobreNos listaFilmes={listaFilmes} />
        <Footer />
      </>
    </Suspense>
  )
}
