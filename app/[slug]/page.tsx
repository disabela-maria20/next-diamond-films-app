import { Metadata } from 'next'
import { Suspense } from 'react'

import { Loading } from '@/components/atoms'
import { Filme } from '@/components/templetes'
import { getCatalogoFilme } from '@/utils/server/requests'

type Params = {
  params: {
    slug: string
  }
}
export const dynamicParams = false
export const revalidate = 6000
export const maxDuration = 5
export async function generateMetadata({
  params: { slug }
}: Params): Promise<Metadata> {
  const filme = await getCatalogoFilme(slug)
  return {
    title: `Diamond Films - ${filme?.movie.title}`,
    description: filme?.movie.shortSynopsis,
    openGraph: {
      title: filme?.movie.title,
      description: filme?.movie.shortSynopsis,
      images: filme?.movie.bannerDesktop
    }
  }
}

export default async function pageCatalogoFilme({ params: { slug } }: Params) {
  const filme = await getCatalogoFilme(slug)

  return (
    <>
      <Suspense fallback={<Loading altura={true} />}>
        <Filme movie={filme} />
      </Suspense>
    </>
  )
}
