/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { IFilmesEstadosResponse } from '../types'

import axios from 'axios'

// Configuração global do token para todas as solicitações Axios
const api = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    token: process.env.API_TOKEN
  }
})

export async function getCatalogoFilme(slug: string) {
  try {
    const res = await api.get(`/movie/get/${slug}`)
    return res.data
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

// Envia os dados da Newsletter
export async function postNewsletter(
  name: string,
  email: string,
  phone: string
) {
  return api.post(`/save/optin?name=${name}&email=${email}&phone=${phone}`, {
    name: name,
    email: email,
    phone: phone
  })
}

// Lista os estados pela seção dos filmes
const CIDADES = process.env.ENDPOINT_ESTADOS_CIDADES
export async function getCheckProgEstado(
  id: number
): Promise<IFilmesEstadosResponse | undefined> {
  try {
    const res = await axios.get(`${CIDADES}/${id}`)
    return res.data
  } catch (err) {
    console.log(err)
  }
}
