import { Filme } from '@/components/templetes'
import { getCatalogoFilme } from '@/server/requests'

type Params = {
  params: {
    id: string
  }
}

export default async function layoutCatalogoFilme({ params: { id } }: Params) {
  const filme = await getCatalogoFilme(id)
  return <Filme movie={filme} />
}
