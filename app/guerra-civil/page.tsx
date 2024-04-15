import { redirect } from 'next/navigation'
import { Metadata } from 'next/types'

export const metadata: Metadata = {
  title: 'Diamond Films - Guerra Civil'
}
export default async function pageGerraCivil() {
  return redirect(`/guerracivil/`)
}
