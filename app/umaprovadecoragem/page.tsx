import { redirect } from 'next/navigation'
import { Metadata } from 'next/types'

export const metadata: Metadata = {
  title: 'Diamond Films - Uma Prova de Coragem'
}
export default async function pageProvaDeCoragem() {
  return redirect(`https://diamondfilms.com.br/uma-prova-de-coragem/`)
}
