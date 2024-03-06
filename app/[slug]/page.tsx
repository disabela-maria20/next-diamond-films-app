import { Metadata } from 'next'
import { Suspense } from 'react'

import { Filme } from '@/components/templetes'
import { getCatalogoFilme } from '@/utils/server/requests'

type Params = {
  params: {
    slug: string
  }
}

export async function generateMetadata({
  params: { slug }
}: Params): Promise<Metadata> {
  const filme = await getCatalogoFilme(slug)
  return {
    title: `Diamond Films - ${filme.movie.title}`,
    description: filme.movie.shortSynopsis,
    openGraph: {
      title: filme.movie.title,
      description: filme.movie.shortSynopsis,
      images: filme.movie.bannerDesktop
    }
  }
}

export default async function pageCatalogoFilme({ params: { slug } }: Params) {
  const filme = await getCatalogoFilme(slug)

  return (
    <>
      <Suspense fallback="Carregando">
        <Filme movie={filme} />
      </Suspense>
    </>
  )
}
