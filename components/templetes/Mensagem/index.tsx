/* eslint-disable prettier/prettier */
'use client'

import React, { useState } from 'react'

import Style from './Mensagem.module.scss'

import { Newsletter } from '@/components/molecules'

const specialToRegular: Record<string, string> = {
  A: '•',
  B: '⫽',
  C: 'V',
  D: '⊂',
  E: '—',
  F: 'ᒕ',
  G: '\\\\',
  H: 'Ո',
  I: '：',
  J: '⊓',
  K: '⅂',
  L: 'Ↄ',
  M: 'ꇓ',
  N: '⊥',
  O: 'L',
  P: '⨪',
  Q: '⫻',
  R: 'Ω',
  S: 'ᘰ',
  T: '⨀',
  U: '⏁',
  V: '⊘',
  W: '⊔',
  X: '⨲',
  Y: '∴',
  Z: '＋'
}

const keyboardOrderQWERTY = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Deletar'],
  ['Espaço']
]

const regularToSpecial = Object.fromEntries(
  Object.entries(specialToRegular).map(([key, value]) => [value, key])
)

const Mensagem = () => {
  const [text, setText] = useState('')
  const [useSpecialChars, setUseSpecialChars] = useState(true)

  const handleCopy = () => {
    navigator.clipboard.writeText(text)
  }

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputText = event.target.value
    setText(inputText)
  }

  const convertToSpecial = (text: string) => {
    return text
      .split('')
      .map((char) => {
        if (char.toUpperCase() === 'G') {
          return '\\\\'
        }
        return specialToRegular[char.toUpperCase()] || char
      })
      .join('')
  }

  const convertToRegular = (text: string) => {
    return text
      .replace(/\\\\/g, 'G')
      .split('')
      .map((char) => {
        return regularToSpecial[char] || char
      })
      .join('')
  }
  const toggleLanguage = () => {
    setText((prevText) => {
      return useSpecialChars
        ? convertToRegular(prevText)
        : convertToSpecial(prevText)
    })
    setUseSpecialChars(!useSpecialChars)
  }

  const keys = useSpecialChars
    ? keyboardOrderQWERTY.map((row) =>
        row.map((key) =>
          key !== 'Deletar' && key !== 'Espaço'
            ? specialToRegular[key] || key
            : key
        )
      )
    : keyboardOrderQWERTY.map((row) => row.map((key) => key))
  const handleKeyPress = (char: string) => {
    if (char === 'Deletar') {
      handleDelete()
    } else if (char === 'Espaço') {
      setText((prevText) => prevText + ' ')
    } else {
      setText((prevText) => prevText + char)
    }
  }

  const handleDelete = () => {
    setText((prevText) => prevText.slice(0, -1))
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
        <label htmlFor="mensagemInicio">Decifre as mensagens de Longlegs</label>
        <textarea
          onChange={handleChange}
          id="mensagemInicio"
          placeholder="Digite seu texto aqui..."
          value={text}
        />
        <div className={Style.areaBtn}>
          <button className={Style.alterar} onClick={toggleLanguage}>
            ALTERNE A LINGUAGEM
          </button>
          <button className={Style.copiar} onClick={handleCopy}>
            Copiar
          </button>
        </div>
        <div className={Style.letras}>
          {keys.map((row, rowIndex) => (
            <div key={rowIndex} className={Style.row}>
              {row.map((char) => (
                <button key={char} onClick={() => handleKeyPress(char)}>
                  {char}
                </button>
              ))}
            </div>
          ))}
        </div>
        <p className={Style.classificacao}>
          VERIFIQUE A CLASSIFICAÇÃO INDICATIVA
        </p>
      </div>
      <img src="/img/longlegs/LONGLEGS_Landing.jpg" alt="imagem ilustrativa " />
      <Newsletter type="modal" />
    </section>
  )
}

export default Mensagem
