'use client'
// import { useEffect } from 'react'

// import { getProgSessoes } from '@/utils/server/requests'

import { useMemo, useState } from 'react'

import Style from './Sessoes.module.scss'

import { IFilmesEstadosResponse } from '@/utils/server/types'

interface ISessoesProps {
  estados: IFilmesEstadosResponse | undefined
  poster: string
}

const Sessoes = ({ estados, poster }: ISessoesProps) => {
  console.log(estados?.estados)
  const [buscar, setBuscar] = useState<string>('')

  const filterEstatdo = useMemo(() => {
    return estados?.estados.filter(
      (estados) =>
        estados.CIDADE.includes(buscar) || estados.ESTADO.includes(buscar)
    )
  }, [buscar, estados?.estados])

  //   useEffect(() => {
  //     const headleFetch = async () => {
  //       const res = await getProgSessoes(21668)
  //       setRes(res)
  //     }
  //     headleFetch()
  //   }, [])

  return (
    <section className={Style.areaSessao}>
      <div className={Style.gridSessoes}>
        <div>
          <img src={poster} alt="" />
        </div>

        <div>
          <input
            type="text"
            value={buscar}
            onChange={(ev) => setBuscar(ev.target.value)}
          />
          <div>hora</div>
          <ul style={{ color: '#fff' }}>
            {filterEstatdo?.map((estado) => (
              <li key={estado.CIDADE}>
                {estado.CIDADE} - {estado.ESTADO}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Sessoes
