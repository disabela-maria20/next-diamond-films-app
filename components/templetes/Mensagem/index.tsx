'use client'

import React, { useState } from 'react'

import Style from './Mensagem.module.scss'

const Mensagem = () => {
  const [mensagemInicio, setMensagemInicio] = useState<string>('')
  const [mensagemFim, setMensagemFim] = useState<string>('')

  const alfabetoInicio = 'abcdefghijklmnopqrstuvwxyz'.split('')
  const alfabetoFim =
    '•, ∕∕, V, ⊂, —, Г, ∖∖, ∩, :, ⨅, ⏋, ͻ, ⨰, ⏊, ⎿, ⨪, ⫻, Ω, Ͼ, ⊙, ⏁, ⊘, ⊔, ⨲, ∴, ╋'.split(
      ', '
    )

  const transformarParaHtmlEntities = (
    texto: string,
    alfabetoOrigem: string[],
    alfabetoDestino: string[]
  ): string => {
    const mapeamentoParaEspecial = new Map<string, string>()
    const mapeamentoParaNormal = new Map<string, string>()

    // Construindo os mapas bidirecionais
    alfabetoOrigem.forEach((char, index) => {
      mapeamentoParaEspecial.set(char.toLowerCase(), alfabetoDestino[index])
      mapeamentoParaNormal.set(alfabetoDestino[index], char.toLowerCase())
    })

    let resultado = ''
    let temp = ''

    for (const char of texto) {
      if (mapeamentoParaEspecial.has(char.toLowerCase())) {
        temp += mapeamentoParaEspecial.get(char.toLowerCase())!
      } else if (mapeamentoParaNormal.has(char)) {
        temp += mapeamentoParaNormal.get(char)!
      } else {
        if (temp) {
          resultado += temp
          temp = ''
        }
        resultado += char
      }
    }

    if (temp) {
      resultado += temp
    }

    return resultado
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
