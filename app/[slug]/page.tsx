import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

import { Loading } from '@/components/atoms'
import { Footer } from '@/components/molecules'
import { Header } from '@/components/organisms'
import { getCatalogoFilme, getHome } from '@/utils/server/requests'

const Filme = dynamic(() => import('@/components/templetes/Filme'), {
  ssr: false,
  loading: () => <Loading altura={true} />
})

type Params = {
  params: {
    slug: string
  }
}

interface ICatalogoFilmeProps {
  slug: string
}
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
      images: `https://diamondfilms.com.br/` + filme?.movie.bannerDesktop
    }
  }
}

export default async function pageCatalogoFilme({ params: { slug } }: Params) {
  const filme = await getCatalogoFilme(slug)

  return (
    <Suspense fallback={<Loading altura={true} />}>
      <>
        <Header />
        <Filme movie={filme} />
        <Footer />
      </>
    </Suspense>
  )
}

export async function generateStaticParams() {
  const posts = await getHome()
  const lancamento: ICatalogoFilmeProps[] = posts.releases.map(
    (post: { slug: string }) => ({
      slug: post.slug
    })
  )

  const streaming: ICatalogoFilmeProps[] = posts.streaming.map(
    (post: { slug: string }) => ({
      slug: post.slug
    })
  )

  const concat = lancamento.concat(streaming)

  return concat
}
