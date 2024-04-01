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
    if (data.getDate() + 1 === 32) {
      return 1
    }
    return data.getDate() + 1
  }

  const formatMes = (text: string) => {
    const data = new Date(text)
    const mes = data.getMonth()
    if (data.getDate() + 1 === 32) {
      return MESES[mes + 1]
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
    const mes = data.getDay()
    return SEMANA[mes + 1]
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
  return {
    formatarData,
    formatDia,
    formatMes,
    formatAno,
    formatDiaDaSemana,
    formatfaltaUmaSemanaParaDataMarcada,
    formatPassouUmaSemanaDesdeData
  }
}
