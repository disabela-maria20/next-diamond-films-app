import axios from 'axios'

// Configuração global do token para todas as solicitações Axios
const api = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    token: process.env.API_TOKEM
  }
})
axios.defaults.headers.common['token'] = process.env.API_TOKEM

export async function getCatalogoFilme(slug: string) {
  try {
    const { data } = await api.get(`/get/${slug}`)
    return data
  } catch (err) {
    console.log(err)
  }
}

// Lista os filmes na página de "/"
export async function getHome() {
  try {
    const res = await api.get(`/movie/list-all`)
    return res.data
  } catch (err) {
    console.log(err)
  }
}

// Lista os banners na página de "/"
export async function getHomeBanner() {
  const res = await api.get(`banner-home`)
  return res.data
}
