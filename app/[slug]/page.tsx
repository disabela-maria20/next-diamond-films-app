/* eslint-disable @typescript-eslint/no-explicit-any */
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google'
import type { Metadata } from 'next'
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
type DataItem = {
  page_title?: string
  property_title?: string
  content_type?: string
  site_country?: string
}

export default async function pageCatalogoFilme({ params: { slug } }: Params) {
  const filme = await getCatalogoFilme(slug)
  const data: DataItem[] = [
    { page_title: filme.movie.title },
    { property_title: filme.movie.title },
    { content_type: 'Microsite' },
    { site_country: 'BR' }
  ]
  return (
    <>
      <Suspense fallback="Carregando">
        <Filme movie={filme} />
      </Suspense>
      <GoogleTagManager
        gtmId="GTM-ND454GP5"
        dataLayerName={filme.movie.title}
        dataLayer={data as any}
      />
      <GoogleAnalytics gaId="G-DRBHT7HM35" />
    </>
  )
}
