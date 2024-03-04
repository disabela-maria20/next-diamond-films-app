import Home from '@/components/templetes/Home'
import { getHome } from '@/utils/server/requests'

export default async function PageHome() {
  const banner = [
    {
      bannerMobile: '/img/hub/Banner_mobile.png',
      bannerDesktop: '/img/hub/Banner_desktop.jpg',
      slug: 'guerra-civil'
    },
    {
      bannerMobile: '/img/hub/Banner_mobile.png',
      bannerDesktop: '/img/hub/Banner_desktop.jpg',
      slug: 'guerra-civil'
    },
    {
      bannerMobile: '/img/hub/Banner_mobile.png',
      bannerDesktop: '/img/hub/Banner_desktop.jpg',
      slug: 'guerra-civil'
    }
  ]
  const listaFilmes = await getHome()
  return <Home banner={banner} listaFilmes={listaFilmes} />
}
