'use client'

import React, { useState } from 'react'

import Style from './Mensagem.module.scss'

const regularToSpecial: Record<string, string> = {
  Q: '///',
  W: '⊔',
  E: '—',
  R: 'Ω',
  T: '⨀',
  Y: '∴',
  U: '⏁',
  I: '：',
  O: 'L',
  P: '⨪',
  A: '•',
  S: 'ᘰ',
  D: '⊂',
  F: 'ᒕ',
  G: '\\\\',
  H: 'Ո',
  J: '⊓',
  K: '⅂',
  L: 'Ↄ',
  Z: '＋',
  X: '⨲',
  C: 'V',
  V: '⊘',
  B: '//',
  N: '⊥',
  M: 'ꇓ'
}

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
      let newText = prevText

      if (useSpecialChars) {
        newText = newText
          .replace(/Q/g, '///')
          .replace(/W/g, '⊔')
          .replace(/E/g, '—')
          .replace(/R/g, 'Ω')
          .replace(/T/g, '⨀')
          .replace(/Y/g, '∴')
          .replace(/U/g, '⏁')
          .replace(/I/g, '：')
          .replace(/O/g, 'L')
          .replace(/P/g, '⨪')
          .replace(/A/g, '•')
          .replace(/S/g, 'ᘰ')
          .replace(/D/g, '⊂')
          .replace(/F/g, 'ᒕ')
          .replace(/G/g, '\\\\')
          .replace(/H/g, 'Ո')
          .replace(/J/g, '⊓')
          .replace(/K/g, '⅂')
          .replace(/L/g, 'Ↄ')
          .replace(/Z/g, '＋')
          .replace(/X/g, '⨲')
          .replace(/C/g, 'V')
          .replace(/V/g, '⊘')
          .replace(/B/g, '//')
          .replace(/N/g, '⊥')
          .replace(/M/g, 'ꇓ')
      } else {
        newText = newText
          .replace(/\/\/\//g, 'Q')
          .replace(/⊔/g, 'W')
          .replace(/—/g, 'E')
          .replace(/Ω/g, 'R')
          .replace(/⨀/g, 'T')
          .replace(/∴/g, 'Y')
          .replace(/⏁/g, 'U')
          .replace(/：/g, 'I')
          .replace(/L/g, 'O')
          .replace(/⨪/g, 'P')
          .replace(/•/g, 'A')
          .replace(/ᘰ/g, 'S')
          .replace(/⊂/g, 'D')
          .replace(/ᒕ/g, 'F')
          .replace(/\\\\/g, 'G')
          .replace(/Ո/g, 'H')
          .replace(/⊓/g, 'J')
          .replace(/⅂/g, 'K')
          .replace(/Ↄ/g, 'L')
          .replace(/＋/g, 'Z')
          .replace(/⨲/g, 'X')
          .replace(/V/g, 'C')
          .replace(/⊘/g, 'V')
          .replace(/\/\//g, 'B')
          .replace(/⊥/g, 'N')
          .replace(/ꇓ/g, 'M')
      }

      return newText
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
          onChange={handleChange}
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
