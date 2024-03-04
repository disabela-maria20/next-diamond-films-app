export const useFormatarData = () => {
  const formatarData = (data: string): string => {
    const meses: string[] = [
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

    const partesData = data.split('-')
    const dia = partesData[2]
    const mes = meses[parseInt(partesData[1], 10) - 1]
    const ano = partesData[0]

    return `${dia} de ${mes} de ${ano}`
  }

  return formatarData
}
