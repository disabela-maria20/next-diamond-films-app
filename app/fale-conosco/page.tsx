import { Metadata } from 'next'
import { Suspense } from 'react'

import { Loading } from '@/components/atoms'
import Contato from '@/components/templetes/Contato'
export const metadata: Metadata = {
  title: 'Diamond Films - Fale Conosco',
  description:
    'Tem alguma dúvida sobre nossos filmes ou está interessado em parcerias? Entre em contato com a Diamond Films Brasil para obter mais informações. Estamos aqui para ajudar!'
}
export default function Page() {
  return (
    <Suspense fallback={<Loading altura={true} />}>
      <Contato />
    </Suspense>
  )
}
