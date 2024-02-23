import { IFilmeProps } from '@/server/types'

type Params = {
  params: {
    id: string
  }
}

export default async function layoutCatalogoFilme({ params: { id } }: Params) {
  const filmeData = await fetch(
    `http://localhost:3000/filmes?id_vibezz_movie=${id}`
  )

  const dadosFilmes: IFilmeProps = await filmeData.json()

  return <>{dadosFilmes.banner_desktop}</>
}
