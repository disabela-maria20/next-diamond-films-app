import { redirect } from 'next/navigation'
import { Metadata } from 'next/types'

export const metadata: Metadata = {
  title: 'Diamond Films - Uma Vida'
}
export default async function pageUmaVida() {
  return redirect(`https://diamondfilms.com.br/uma-vida/`)
}
