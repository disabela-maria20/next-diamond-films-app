import { Metadata } from 'next'
import { Suspense } from 'react'

import { Loading } from '@/components/atoms'
import { Mensagem } from '@/components/templetes'

export const metadata: Metadata = {
  title: 'Diamond Films - Codigo Longlegs',
  description:
    'Desvende os mistérios de Longlegs! Use um teclado especial para decifrar as mensagens secretas e mergulhe na trama emocionante deste filme intrigante.',
  openGraph: {
    title: 'Diamond Films - Codigo Longlegs',
    description:
      'Desvende os mistérios de Longlegs! Use um teclado especial para decifrar as mensagens secretas e mergulhe na trama emocionante deste filme intrigante.',
    images: '/img/longlegs/LONGLEGS_Landing.jpg',
    url: 'https://diamondfilms.com.br/codigolonglegs'
  }
}

const pageMensagem = () => {
  return (
    <Suspense fallback={<Loading altura={true} />}>
      <Mensagem />
    </Suspense>
  )
}

export default pageMensagem
