import { Metadata } from 'next'
import { Suspense } from 'react'

import { Loading } from '@/components/atoms'
import { Mensagem } from '@/components/templetes'

export const metadata: Metadata = {
  title: 'Diamond Films - Escreva sua mensagem'
}

const pageMensagem = () => {
  return (
    <Suspense fallback={<Loading altura={true} />}>
      <Mensagem />
    </Suspense>
  )
}

export default pageMensagem
