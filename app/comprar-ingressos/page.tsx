import { Suspense } from 'react'

import { Loading } from '@/components/atoms'
import ComprarIngresso from '@/components/templetes/ComprarIngresso'
import banner from '@/utils/server/json/Banner.json'
import { getHome } from '@/utils/server/requests'

const pageComprarIngresso = async () => {
  const listaFilmes = await getHome()
  return (
    <Suspense fallback={<Loading />}>
      <ComprarIngresso banner={banner} listaFilmes={listaFilmes} />
    </Suspense>
  )
}

export default pageComprarIngresso
