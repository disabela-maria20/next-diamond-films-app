/* eslint-disable prettier/prettier */
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google'
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'

import '@/styles/sass/globals.scss'

import { Footer, Location } from '@/components/molecules'
import { Header } from '@/components/organisms'
import { FilmesLancamentosProvider } from '@/utils/context/FilmesLancamentos'

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Diamond Films'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={montserrat.className}>
        <Header />
        <FilmesLancamentosProvider>
         {children} 
        </FilmesLancamentosProvider>
        <Location />
        <Footer />
      </body>
      <GoogleTagManager gtmId="GTM-ND454GP5" />
      <GoogleAnalytics gaId="G-DRBHT7HM35" />
    </html>
  )
}
