import { Metadata } from 'next'
import { Suspense } from 'react'

import { Loading } from '@/components/atoms'
import { Footer } from '@/components/molecules'
import { Header } from '@/components/organisms'
import { Juntos } from '@/components/templetes'
import { getCatalogoFilme, getHome } from '@/utils/server/requests'

export const revalidate = 60
export const dynamicParams = true

interface ICatalogoFilmeProps {
  slug: string
}
export async function generateMetadata(): Promise<Metadata> {
  const filme = await getCatalogoFilme('juntos')
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

export default async function pageCatalogoFilme() {

  const filme = await getCatalogoFilme('juntos')

  return (
    <Suspense fallback={<Loading altura={true} />}>
      <>
        <Header />
        teste
        <Juntos movie={filme} />
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
