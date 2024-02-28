import axios from 'axios'

// Configuração global do token para todas as solicitações Axios
axios.defaults.headers.common['token'] = process.env.API_TOKEM

const api = axios.create({
  baseURL: process.env.API_URL
})

export async function getCatalogoFilme(id: string) {
  try {
    const { data } = await api.get(`get/${id}`)
    return data
  } catch (error) {
    console.error(error)
    throw error
  }
}

// Lista os filmes na página de "/"
export async function getHome() {
  try {
    const { data } = await api.get(`list-all`)
    return data.releases
  } catch (error) {
    console.error(error)
    throw error
  }
}
