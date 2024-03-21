import ComprarIngresso from '@/components/templetes/ComprarIngresso'
import banner from '@/utils/server/json/Banner.json'
import { getHome } from '@/utils/server/requests'

const pageComprarIngresso = async () => {
  const listaFilmes = await getHome()
  return <ComprarIngresso banner={banner} listaFilmes={listaFilmes} />
}

export default pageComprarIngresso
