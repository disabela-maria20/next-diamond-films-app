import axios from 'axios'

// Configuração global do token para todas as solicitações Axios
const api = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    token: process.env.API_TOKEN
  }
})

export async function getCatalogoFilme(slug: string) {
  const { data } = await api.get(`get/${slug}`)
  return data
}

// Lista os filmes na página de "/"
export async function getHome() {
  const res = await api.get(`list-all`)

  return res.data
}

// Lista os banners na página de "/"
export async function getHomeBanner() {
  const res = await api.get(`banner-home`)
  return res.data
}
