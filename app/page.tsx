import { Suspense } from 'react'

import Home from '@/components/templetes/Home'
import { getHome } from '@/utils/server/requests'

export default async function PageHome() {
  const banner = [
    {
      bannerMobile: '/img/poster/DMND_Banner-Mobile_800x1000.png',
      bannerDesktop: '/img/poster/DMND_Banner-Desktop-Título_1450x540.webp',
      slug: '/osabordavida',
      id: 1
    },
    {
      bannerMobile: '/img/poster/guerraCivilBanner_mobile_1180x1025.jpg',
      bannerDesktop: '/img/poster/guerraCivilBanner_desktop_1440x540.jpg',
      slug: '/guerracivil',
      id: 2
    }
  ]
  const listaFilmes = await getHome()
  return (
    <Suspense fallback="Carregando...">
      <Home banner={banner} listaFilmes={listaFilmes} />
    </Suspense>
  )
}
