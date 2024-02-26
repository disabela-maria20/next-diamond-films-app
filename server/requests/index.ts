import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api-diamond-gray.vercel.app/'
})

// Traz o filme da pagina "/catalogo/nome_do_filme"
export async function getCatalogoFilme(id: string) {
  const res = await api.get(`filmes?id_vibezz_movie=${id}`)
  return res.data
}

// Lista os filmes na pagina de "/catalogo/"
export async function getCatalogoCategorias() {
  const res = await api.get(`filmes`)
  return res.data
}
