import { Metadata } from 'next'
import { Suspense } from 'react'

import { Loading } from '@/components/atoms'
import SobreNos from '@/components/templetes/SobreNos'
import { getHome } from '@/utils/server/requests'

export const metadata: Metadata = {
  title: 'Diamond Films - Fale Conosco'
}
export default async function Page() {
  const listaFilmes = await getHome()
  return (
    <Suspense fallback={<Loading altura={true} />}>
      <SobreNos listaFilmes={listaFilmes} />
    </Suspense>
  )
}
