import axios from 'axios'

// Configuração global do token para todas as solicitações Axios
const api = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    token: process.env.API_TOKEN
  }
})

export async function getCatalogoFilme(id: string) {
  const { data } = await api.get(`get/${id}`)
  return data
}

// Lista os filmes na página de "/"
export async function getHome() {
  const res = await api.get(`list-all`)
  console.log(res)

  return res.data
}
