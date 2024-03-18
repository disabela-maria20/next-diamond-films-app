import Catalogo from '@/components/templetes/Catalogo'
import { getHome } from '@/utils/server/requests'

const PageFilmes = async () => {
  const listaFilmes = await getHome()
  return <Catalogo listaFilmes={listaFilmes} />
}

export default PageFilmes
