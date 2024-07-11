'use client'

import React, { useState } from 'react'

import Style from './Mensagem.module.scss'

const specialToRegular: Record<string, string> = {
  '///': 'Q',
  '⊔': 'W',
  '—': 'E',
  Ω: 'R',
  '⨀': 'T',
  '∴': 'Y',
  '⏁': 'U',
  '：': 'I',
  L: 'O',
  '⨪': 'P',
  '•': 'A',
  ᘰ: 'S',
  '⊂': 'D',
  ᒕ: 'F',
  '\\\\': 'G',
  Ո: 'H',
  '⊓': 'J',
  '⅂': 'K',
  Ↄ: 'L',
  '＋': 'Z',
  '⨲': 'X',
  V: 'C',
  '⊘': 'V',
  '//': 'B',
  '⊥': 'N',
  ꇓ: 'M'
}

const regularToSpecial: Record<string, string> = Object.fromEntries(
  Object.entries(specialToRegular).map(([key, value]) => [value, key])
)

const keyboardOrderQWERTY = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
]

const Mensagem = () => {
  const [text, setText] = useState('')
  const [useSpecialChars, setUseSpecialChars] = useState(true)

  const handleKeyPress = (char: string) => {
    setText((prevText) => prevText + char)
  }

  const handleDelete = () => {
    setText((prevText) => prevText.slice(0, -1))
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(text)
  }

  const handleToggle = () => {
    setUseSpecialChars(!useSpecialChars)
    setText((prevText) => {
      return useSpecialChars
        ? prevText
            .split('')
            .map((char) => regularToSpecial[char] || char)
            .join('')
        : prevText
            .split('')
            .map((char) => specialToRegular[char] || char)
            .join('')
    })
  }

  const keys = useSpecialChars
    ? keyboardOrderQWERTY.map((row) =>
        row.map((key) => regularToSpecial[key] || key)
      )
    : keyboardOrderQWERTY

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value)
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
          value={text}
          onChange={handleChange} // Adiciona o onChange para atualizar o estado `text`
          id="mensagemInicio"
          placeholder="Digite seu texto aqui..."
        />
        <div className={Style.areaBtn}>
          <button className={Style.alterar} onClick={handleToggle}>
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
          <button onClick={handleDelete}>Deletar</button>
        </div>
        <p className={Style.classificacao}>
          VERIFIQUE A CLASSIFICAÇÃO INDICATIVA
        </p>
      </div>
    </section>
  )
}

export default Mensagem
