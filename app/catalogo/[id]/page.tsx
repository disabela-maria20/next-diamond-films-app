/* eslint-disable no-debugger */
'use server'

import { IFilmeProps } from '@/server/types'

// import { Filme } from '@/server/types'

type Params = {
  params: {
    id: string
  }
}

export default async function CatalogoFilme({ params: { id } }: Params) {
  const filmeData = await fetch(
    `http://localhost:3000/filmes?id_vibezz_movie=${id}`
  )
  const data = await filmeData.json()

  return (
    <section>
      {data?.map((data: IFilmeProps) => (
        <div key={data.id_vibezz_movie}>
          <img src={data.banner_desktop} alt="" />
          <p>{data.campanha_instagram}</p>
        </div>
      ))}
    </section>
  )
}
