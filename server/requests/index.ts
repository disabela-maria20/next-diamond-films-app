import axios from 'axios'

// Configuração global do token para todas as solicitações Axios
axios.defaults.headers.common['token'] = process.env.API_TOKEM

const api = axios.create({
  baseURL: process.env.API_URL
})

export async function getCatalogoFilme(id: string) {
  try {
    const { data } = await api.get(`movie/get/${id}`)
    return data
  } catch (error) {
    console.error(error)
    throw error
  }
}

// Lista os filmes na página de "/catalogo/"
export async function getCatalogoCategorias() {
  try {
    const { data, status } = await api.get(`movie/get`)

    return { data, status }
  } catch (error) {
    console.error(error)
    throw error
  }
}
