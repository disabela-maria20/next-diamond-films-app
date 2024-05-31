export const MESES: string[] = [
  'janeiro',
  'fevereiro',
  'março',
  'abril',
  'maio',
  'junho',
  'julho',
  'agosto',
  'setembro',
  'outubro',
  'novembro',
  'dezembro'
]

export const SEMANA: string[] = [
  'dom',
  'seg',
  'ter',
  'qua',
  'qui',
  'sex',
  'sab',
  'dom'
]
const mesesImpares = MESES.filter((_, index) => (index + 1) % 2 !== 0)
export const useFormatarData = () => {
  const formatarData = (data: string): string => {
    const partesData = data?.split('-')
    const dia = partesData[2]
    const mes = MESES[parseInt(partesData[1], 10) - 1]
    const ano = partesData[0]

    return `${dia} de ${mes} de ${ano}`
  }

  const formatDia = (text: string) => {
    const data = new Date(text)
    console.log()

    if (data.getDate() + 1 === 32) {
      return 1
    }
    if (
      data.getDate() + 1 == 31 &&
      MESES.includes(mesesImpares[data.getMonth() + 1])
    ) {
      return data.getDate() + 1
    }
    return data.getDate() + 1
  }

  const formatMes = (text: string) => {
    const data = new Date(text)
    const mes = data.getMonth()
    if (data.getDate() + 1 === 32) {
      return MESES[mes + 1]
    }
    if (
      data.getDate() + 1 == 31 &&
      MESES.includes(mesesImpares[data.getMonth() + 1])
    ) {
      return MESES[mes]
    }
    return MESES[mes]
  }

  const formatAno = (text: string) => {
    const data = new Date(text)
    const ano = data.getFullYear()

    return ano
  }

  const formatDiaDaSemana = (text: string) => {
    const data = new Date(text)
    const mes = data.getDay() + 1
    return SEMANA[mes]
  }

  function formatMesmaSemana(dataString: string): boolean {
    const data = new Date(dataString)
    const hoje = new Date()

    const semanaAtual = new Date(
      hoje.getFullYear(),
      hoje.getMonth(),
      hoje.getDate()
    )
    const semanaData = new Date(
      data.getFullYear(),
      data.getMonth(),
      data.getDate()
    )

    const numeroSemanaAtual = Math.ceil(
      (+semanaAtual - +new Date(semanaAtual.getFullYear(), 0, 1)) / 86400000 / 7
    )
    const numeroSemanaData = Math.ceil(
      (+semanaData - +new Date(semanaData.getFullYear(), 0, 1)) / 86400000 / 7
    )

    return numeroSemanaData === numeroSemanaAtual
  }

  function formatfaltaUmaSemanaParaDataMarcada(dataString: string): boolean {
    const dataAtual: Date = new Date(dataString)
    const dataLimite: Date = new Date()

    return dataAtual > dataLimite
  }

  function formatPassouUmaSemanaDesdeData(dataString: string): boolean {
    const data = new Date(dataString)
    const hoje = new Date()

    const umaSemanaDepois = new Date(data)
    umaSemanaDepois.setDate(umaSemanaDepois.getDate() + 7)

    return hoje >= umaSemanaDepois
  }

  function formatDataEstreia(dataString: string) {
    const dataAtual = new Date()
    const partesData = dataString.split('-')

    if (partesData.length !== 3) {
      return false
    }

    const ano = parseInt(partesData[0], 10)
    const mes = parseInt(partesData[1], 10) - 1
    const dia = parseInt(partesData[2], 10)

    const dataEstreia = new Date(ano, mes, dia)

    return (
      dataAtual.getDate() === dataEstreia.getDate() &&
      dataAtual.getMonth() === dataEstreia.getMonth() &&
      dataAtual.getFullYear() === dataEstreia.getFullYear()
    )
  }
  return {
    formatarData,
    formatDia,
    formatMes,
    formatAno,
    formatDiaDaSemana,
    formatMesmaSemana,
    formatfaltaUmaSemanaParaDataMarcada,
    formatPassouUmaSemanaDesdeData,
    formatDataEstreia
  }
}
