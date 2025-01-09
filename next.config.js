/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
/** @type {import('next').NextConfig} */

const path = require('path')
const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles', 'sass')],
    prependData: `@import 'abstracts/_index.scss';`,
  },
  env: {
    API_TOKEM: process.env.API_TOKEN,
    API_URL: process.env.API_URL,
  },
  compiler: {
    styledComponents: true,
    removeConsole: false,
  },
  reactStrictMode: false,
  output: 'export',
  experimental: {
    dynamicIO: true,
    cacheLife: {
      images: {
        stale: 60 * 60 * 24,
        revalidate: 60 * 60 * 24,
        expire: 60 * 60 * 24 * 30,
      },
    },
  },

  // distDir: 'build',
  // trailingSlash: true
}

module.exports = nextConfig
