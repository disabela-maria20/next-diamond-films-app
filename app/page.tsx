import Home from '@/components/templetes/Home'
import { getHome, getHomeBanner } from '@/server/requests'

export default async function PageHome() {
  const banner = await getHomeBanner()
  const listaFilmes = await getHome()

  return <Home banner={banner} listaFilmes={listaFilmes} />
}
