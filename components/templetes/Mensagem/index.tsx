'use client'

import { useState } from 'react'

import Style from './Mensagem.module.scss'

const Mensagem = () => {
  const [mensagemInicio, setMensagemInicio] = useState<string>('')
  const [mensagemFim, setMensagemFim] = useState<string>('')

  const alfabetoInicio =
    'A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z'.split(
      ', '
    )
  const alfabetoFim =
    '•, ∕∕, V, ⊂, —, Г, ∖∖, ∩, :, ⨅, ⏋, ͻ, ⨰, ⏊, ⎿ , ⨪, ⫻, Ω, S, ⊙, ⏁, V, ⊔,⨲, ∴, ╋'.split(
      ', '
    )

  const transformarParaHtmlEntities = (
    texto: string,
    alfabetoOrigem: string[],
    alfabetoDestino: string[]
  ): string => {
    return Array.from(texto)
      .map((char) => {
        const index = alfabetoOrigem.indexOf(char.toUpperCase())
        if (index !== -1) {
          return alfabetoDestino[index]
        }
        return char
      })
      .join('')
  }

  const handleMensagemInicioChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const texto = event.target.value
    setMensagemInicio(texto)
    const mensagemFimTransformada = transformarParaHtmlEntities(
      texto,
      alfabetoInicio,
      alfabetoFim
    )
    setMensagemFim(mensagemFimTransformada)
  }

  const handleMensagemFimChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const texto = event.target.value
    setMensagemFim(texto)
    const mensagemInicioTransformada = transformarParaHtmlEntities(
      texto,
      alfabetoFim,
      alfabetoInicio
    )
    setMensagemInicio(mensagemInicioTransformada)
  }

  const copiarMensagemFim = () => {
    navigator.clipboard
      .writeText(mensagemFim)
      .then(() => {
        return
      })
      .catch((err) => {
        console.error('Erro ao copiar a mensagem: ', err)
      })
  }
  return (
    <section className={Style.Mensagem}>
      <img src="/img/longlegs.png" alt="Poster do filme longlegs" />
      <div className="container">
        <div className={Style.areaMensagem}>
          <h1>Longlegs - Vínculo Mortal</h1>
          <p>
            Digite uma mensagem no campo abaixo e veja como ela se transforma no
            código secreto de Longlegs. Ou, se você se sentir corajoso, tente
            decifrar uma mensagem dele.
          </p>
          <div className={Style.grid}>
            <label htmlFor="mensagemInicio">
              <span>Escreva sua mensagem</span>
              <textarea
                id="mensagemInicio"
                value={mensagemInicio}
                onChange={handleMensagemInicioChange}
              />
            </label>
            <label htmlFor="mensagemFim">
              <span>Sua mensagem ficou</span>
              <textarea
                id="mensagemFim"
                className={Style.font}
                value={mensagemFim}
                onChange={handleMensagemFimChange}
              />
            </label>
          </div>
          <div className={Style.areaBtn}>
            <button onClick={copiarMensagemFim}>Copiar</button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Mensagem
