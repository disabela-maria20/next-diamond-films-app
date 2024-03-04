import { Filme } from '@/components/templetes'
import { getCatalogoFilme } from '@/utils/server/requests'

type Params = {
  params: {
    slug: string
  }
}

export default async function layoutCatalogoFilme({
  params: { slug }
}: Params) {
  const filme = await getCatalogoFilme(slug)

  return <Filme movie={filme} />
}
