/** @type {import('next').NextConfig} */

const path = require('path')
const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles', 'sass')],
    prependData: `@import 'abstracts/_index.scss';`
  },
  env: {
    API_TOKEM:
      '983e50cc3915038c63b8539fd3d30054dd80cba0ec573fac9952233301cdd4a3',
    API_URL: 'https://api-partner.vibezz.com/',
    ENDPOINT_SESSOES: 'https://api.vibezz.com/progDiamond/movie',
    ENDPOINT_ESTADOS_CIDADES:
      'https://api.vibezz.com/progDiamond/getEstadosFilme'
  }
}

module.exports = nextConfig
