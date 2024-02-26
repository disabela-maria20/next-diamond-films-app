/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from 'next/link'
import React from 'react'

import { getCatalogoCategorias } from '@/server/requests'

const PageCategoria = async () => {
  const res = await getCatalogoCategorias()

  return (
    <>
      {res.map((data: any) => (
        <Link
          key={data.id_vibezz_movie}
          href={`/catalogo/${data?.id_vibezz_movie}`}
          style={{
            color: '#fff',
            height: '300px',
            display: 'block',
            padding: '300px',
            fontSize: '1.8rem'
          }}
        >
          {data.titulo_internacional}
        </Link>
      ))}
    </>
  )
}

export default PageCategoria
