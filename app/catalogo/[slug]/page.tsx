import { Suspense } from 'react'

import { Filme } from '@/components/templetes'
import { getCatalogoFilme } from '@/utils/server/requests'

type Params = {
  params: {
    slug: string
  }
}

export default async function pageCatalogoFilme({ params: { slug } }: Params) {
  const filme = await getCatalogoFilme(slug)

  return (
    <Suspense fallback="Carregando">
      <Filme movie={filme} />
    </Suspense>
  )
}
