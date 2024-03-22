import { Suspense } from 'react'

import { Loading } from '@/components/atoms'
import Catalogo from '@/components/templetes/Catalogo'
import { getHome } from '@/utils/server/requests'

const PageFilmes = async () => {
  const listaFilmes = await getHome()
  return (
    <Suspense fallback={<Loading altura={true} />}>
      <Catalogo listaFilmes={listaFilmes} />
    </Suspense>
  )
}

export default PageFilmes
