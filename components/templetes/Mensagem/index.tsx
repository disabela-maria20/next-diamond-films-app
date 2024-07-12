/* eslint-disable prettier/prettier */
'use client'

import React, { useState } from 'react'

import Style from './Mensagem.module.scss'

const specialToRegular: Record<string, string> = {
  "A": "•",
  "B": "⫽",
  "C": "V",
  "D": "⊂",
  "E": "—",
  "F": "ᒕ",
  "G": "⫴",
  "H": "Ո",
  "I": "：",
  "J": "⊓",
  "K": "⅂",
  "L": "Ↄ",
  "M": "ꇓ",
  "N": "⊥",
  "O": "L",
  "P": "⨪",
  "Q": "⫻",
  "R": "Ω",
  "S": "ᘰ",
  "T": "⨀",
  "U": "⏁",
  "V": "⊘",
  "W": "⊔",
  "X": "⨲",
  "Y": "∴",
  "Z": "＋"
}

const regularToSpecial = Object.fromEntries(Object.entries(specialToRegular).map(([key, value]) => [value, key]))

const Mensagem = () => {
  const [text, setText] = useState('')
  const [useSpecialChars, setUseSpecialChars] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(text)
  }

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputText = event.target.value
    setText(inputText)
  }

  const convertToSpecial = (text: string) => {
    return text.split('').map((char) => specialToRegular[char.toUpperCase()] || char).join('')
  }

  const convertToRegular = (text: string) => {
    return text.split('').map((char) => regularToSpecial[char] || char).join('')
  }

  const toggleLanguage = () => {
    setText((prevText) => {
      return useSpecialChars ? convertToRegular(prevText) : convertToSpecial(prevText)
    })
    setUseSpecialChars(!useSpecialChars)
  }

  return (
    <section className={Style.Mensagem}>
      <div className={Style.areaMensagem}>
        <h2>
          29 de agosto
          <span>SOMENTE NOS CINEMAS</span>
        </h2>
        <img src="/img/longlegs/logo.png" alt="logo do filme longlegs" />
        <h1>Longlegs - Vínculo Mortal</h1>
        <label htmlFor="mensagemInicio">Decifre as mensagens de longlegs</label>
        <textarea
          onChange={handleChange}
          id="mensagemInicio"
          placeholder="Digite seu texto aqui..."
          value={text}
        />
        <div className={Style.areaBtn}>
          <button
            className={Style.alterar}
            onClick={toggleLanguage}
          >
            ALTERNE A LINGUAGEM
          </button>
          <button className={Style.copiar} onClick={handleCopy}>
            Copiar
          </button>
        </div>
        <p className={Style.classificacao}>
          VERIFIQUE A CLASSIFICAÇÃO INDICATIVA
        </p>
      </div>
      <img src="/img/longlegs/LONGLEGS_Landing.jpg" alt="imagem ilustrativa " />
    </section>
  )
}

export default Mensagem
